const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey';

const users = []; // Mock users (real will be from database)

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) return res.status(400).json({ message: 'User not found' });

// Compare the password
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

// Generate the JWT token
const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
res.json({ token });
};

exports.validateToken = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      // Token'dan "Bearer" kısmını ayır
      const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
      res.json({ username: decoded.username }); // Doğrulama başarılıysa kullanıcıyı döndür
    } catch (err) {
      console.error('Token Validation Error:', err.message); // Hata detayını logla
      res.status(403).json({ message: 'Invalid Token' });
    }
  };


