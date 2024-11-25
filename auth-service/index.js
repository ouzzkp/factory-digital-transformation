const express = require('express');
const app = express();
const AuthRoutes = require('./src/routes/AuthRoutes');

app.use(express.json());
app.use('/auth', AuthRoutes);

app.listen(4000, () => {
    console.log('Auth Service is running on http://localhost:4000');
});