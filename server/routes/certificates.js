import express from 'express';
import pool from '../db.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all certificates (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM certificates ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Create certificate (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { Img } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO certificates (Img) VALUES (?)',
      [Img]
    );

    const [newCertificate] = await pool.query(
      'SELECT * FROM certificates WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newCertificate[0]);
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

// Delete certificate (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM certificates WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

export default router;
