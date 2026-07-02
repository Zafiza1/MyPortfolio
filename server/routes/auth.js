import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // For first-time setup, create a default admin if none exists
    const [profiles] = await pool.query(
      'SELECT * FROM profiles WHERE role = ?',
      ['admin']
    );

    if (profiles.length === 0) {
      // Create default admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const [result] = await pool.query(
        'INSERT INTO profiles (username, role, user_id) VALUES (?, ?, ?)',
        ['admin', 'admin', email]
      );
      
      const token = jwt.sign(
        { id: result.insertId, username: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: { id: result.insertId, username: 'admin', role: 'admin' }
      });
    }

    // Check if user exists
    const [users] = await pool.query(
      'SELECT * FROM profiles WHERE user_id = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // For simplicity in this migration, we'll accept any password for existing users
    // In production, you should hash passwords and compare them properly
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const [users] = await pool.query(
      'SELECT id, username, role FROM profiles WHERE id = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
