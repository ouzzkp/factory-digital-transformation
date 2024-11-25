const axios = require('axios');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const response = await axios.get('http://localhost:4000/auth/validateToken', {
            headers: { Authorization: token},
        });
        req.user = response.data;
        next(); 

    }
    catch (error) {
        console.error('Auth Middleware Error:', error.response?.data || error.message);
        console.log(error.message);
        console.log('User:', req.user);
        console.log('Token:', token);
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;

