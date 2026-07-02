import express from 'express';
import pool from '../db.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM projects ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { Title, Description, Img, Link, Github, Features, TechStack, is_published, order_index } = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO projects (Title, Description, Img, Link, Github, Features, TechStack, is_published, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Title,
        Description,
        Img,
        Link,
        Github,
        JSON.stringify(Features || []),
        JSON.stringify(TechStack || []),
        is_published !== undefined ? is_published : true,
        order_index || 0
      ]
    );

    const [newProject] = await pool.query(
      'SELECT * FROM projects WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newProject[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { Title, Description, Img, Link, Github, Features, TechStack, is_published, order_index } = req.body;
    
    await pool.query(
      `UPDATE projects 
       SET Title = ?, Description = ?, Img = ?, Link = ?, Github = ?, 
           Features = ?, TechStack = ?, is_published = ?, order_index = ?
       WHERE id = ?`,
      [
        Title,
        Description,
        Img,
        Link,
        Github,
        JSON.stringify(Features || []),
        JSON.stringify(TechStack || []),
        is_published !== undefined ? is_published : true,
        order_index || 0,
        req.params.id
      ]
    );

    const [updatedProject] = await pool.query(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (updatedProject.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updatedProject[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
