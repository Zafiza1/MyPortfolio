import express from 'express';
import pool from '../db.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all comments (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM portfolio_comments ORDER BY is_pinned DESC, created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Create comment (public)
router.post('/', async (req, res) => {
  try {
    const { content, user_name, profile_image, is_pinned } = req.body;
    
    if (!content || !user_name) {
      return res.status(400).json({ error: 'Content and user_name required' });
    }

    // Public users can only create non-pinned comments
    if (is_pinned === true) {
      return res.status(403).json({ error: 'Only admins can pin comments' });
    }

    const [result] = await pool.query(
      'INSERT INTO portfolio_comments (content, user_name, profile_image, is_pinned) VALUES (?, ?, ?, ?)',
      [content, user_name, profile_image || null, false]
    );

    const [newComment] = await pool.query(
      'SELECT * FROM portfolio_comments WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Update comment (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { content, is_pinned } = req.body;
    
    await pool.query(
      'UPDATE portfolio_comments SET content = ?, is_pinned = ? WHERE id = ?',
      [content, is_pinned !== undefined ? is_pinned : false, req.params.id]
    );

    const [updatedComment] = await pool.query(
      'SELECT * FROM portfolio_comments WHERE id = ?',
      [req.params.id]
    );

    if (updatedComment.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment[0]);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Pin/unpin comment (admin only)
router.patch('/:id/pin', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { is_pinned } = req.body;
    
    await pool.query(
      'UPDATE portfolio_comments SET is_pinned = ? WHERE id = ?',
      [is_pinned, req.params.id]
    );

    const [updatedComment] = await pool.query(
      'SELECT * FROM portfolio_comments WHERE id = ?',
      [req.params.id]
    );

    if (updatedComment.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment[0]);
  } catch (error) {
    console.error('Error updating comment pin:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete comment (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM portfolio_comments WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
