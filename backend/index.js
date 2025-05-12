const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existingUsers] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { name, email, role: 'student' } });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
});

// Login de usuario
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
});

// Obtener todos los cursos (única definición)
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM Courses');
    // Convertir valores para que coincidan con lo que CourseCard espera
    const formattedCourses = courses.map(course => ({
      ...course,
      isNew: Boolean(course.isNew),
      isFeatured: Boolean(course.isFeatured),
      price: parseFloat(course.price),
      originalPrice: course.originalPrice ? parseFloat(course.originalPrice) : null,
      rating: parseFloat(course.rating),
      reviews: parseInt(course.reviews, 10),
    }));
    res.json(formattedCourses);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cursos', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token){
    console.log('No hay token');
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Error al verificar token:', err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Ruta protegida para obtener datos del usuario
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM Users WHERE email = ?', [req.user.email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
});

// Refresh profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  const { name, email, role } = req.body;

  try {
    // Verificar si el nuevo email ya existe (si está cambiando)
    if (email && email !== req.user.email) {
      const [existing] = await pool.query('SELECT id FROM Users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }
    }

    await pool.query(
      'UPDATE Users SET name = ?, email = ?, role = ? WHERE email = ?',
      [name, email || req.user.email, role || 'student', req.user.email]
    );

    const [users] = await pool.query(
      'SELECT id, name, email, role FROM Users WHERE email = ?',
      [email || req.user.email]
    );
    // Validar formato de email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Formato de email inválido' });
    }
    // Validar roles permitidos
    const allowedRoles = ['student', 'teacher', 'admin'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      user: users[0],
      message: 'Perfil actualizado correctamente'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
  }
});

// Ruta para obtener un curso específico
app.get('/api/courses/:id', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM Courses WHERE id = ?', [req.params.id]);
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const course = courses[0];
    const formattedCourse = {
      ...course,
      isNew: Boolean(course.isNew),
      isFeatured: Boolean(course.isFeatured),
      price: parseFloat(course.price),
      originalPrice: course.originalPrice ? parseFloat(course.originalPrice) : null,
      rating: parseFloat(course.rating),
      reviews: parseInt(course.reviews, 10),
    };

    res.json(formattedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el curso', error: err.message });
  }
});

// Endpoint para realizar una compra
app.post('/api/purchases', authenticateToken, async (req, res) => {
  const { courseId } = req.body;

  try {
    // Obtener el user_id desde el token
    const [users] = await pool.query('SELECT id FROM Users WHERE email = ?', [req.user.email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userId = users[0].id;

    // Verificar si el curso existe
    const [courses] = await pool.query('SELECT id FROM Courses WHERE id = ?', [courseId]);
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Verificar si el usuario ya compró el curso
    const [existingPurchase] = await pool.query(
      'SELECT id FROM Purchases WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    if (existingPurchase.length > 0) {
      return res.status(400).json({ message: 'Ya has comprado este curso' });
    }

    // Registrar la compra
    await pool.query(
      'INSERT INTO Purchases (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    res.status(201).json({ message: 'Curso comprado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al procesar la compra', error: err.message });
  }
});

// Endpoint para obtener los cursos comprados por el usuario
app.get('/api/purchases', authenticateToken, async (req, res) => {
  try {
    // Obtener el user_id desde el token
    const [users] = await pool.query('SELECT id FROM Users WHERE email = ?', [req.user.email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userId = users[0].id;

    // Obtener los cursos comprados
    const [purchases] = await pool.query(
      'SELECT c.* FROM Courses c JOIN Purchases p ON c.id = p.course_id WHERE p.user_id = ?',
      [userId]
    );

    const formattedPurchases = purchases.map(course => ({
      ...course,
      isNew: Boolean(course.isNew),
      isFeatured: Boolean(course.isFeatured),
      price: parseFloat(course.price),
      originalPrice: course.originalPrice ? parseFloat(course.originalPrice) : null,
      rating: parseFloat(course.rating),
      reviews: parseInt(course.reviews, 10),
    }));

    res.json(formattedPurchases);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener compras', error: err.message });
  }
});
