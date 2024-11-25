const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authenticateToken = require('./authMiddleware');

const app = express();

// Middlewate: Loggnig incoming requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
    });

// Proxy Middleware: Microservices forwards
app.use('/production', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));
app.use('/inventory', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));
app.use('/personnel', createProxyMiddleware({ target: 'http://localhost:4003', changeOrigin: true }));

// Authentication for protected route
app.use('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route', user: req.user });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message + ' ==== Internal Server Error' });
});

// Start the Gateway Server
app.listen(3000, () => {
    console.log('Gateway Server is running on http://localhost:3000');
});