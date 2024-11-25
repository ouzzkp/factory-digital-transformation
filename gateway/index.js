const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/production', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));

app.listen(3000, () => {
    console.log('Gateway listening on port 3000');
    }
);

