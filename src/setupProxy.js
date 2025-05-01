const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      onProxyRes: function(proxyRes) {
        proxyRes.headers['X-Content-Type-Options'] = 'nosniff';
      }
    })
  );
};
