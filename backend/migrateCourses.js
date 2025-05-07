const mysql = require('mysql2/promise');
const courses = require('../src/data/courses.json');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'aprende_digital',
  });

  for (const course of courses) {
    await connection.execute(
      `INSERT INTO Courses (id, title, description, image, duration, level, instructor, price, originalPrice, rating, reviews, category, isNew, isFeatured, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        course.id,
        course.title,
        course.description,
        course.image,
        course.duration,
        course.level,
        course.instructor,
        course.price,
        course.originalPrice,
        course.rating,
        course.reviews,
        course.category,
        course.isNew,
        course.isFeatured,
      ]
    );
  }

  console.log('Cursos migrados exitosamente');
  await connection.end();
})();
