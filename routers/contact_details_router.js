const express = require('express');
const router = express.Router();
const contactDetailService = require('../services/contact_detail_service');
const { authenticateToken } = require('../middlewares/auth'); 

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const userData = req.body;
    const response = await contactDetailService.signup(userData);
    res.status(201).json(response);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await contactDetailService.login(email, password);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get all users (authentication required)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await contactDetailService.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Delete user by ID (authentication required)
router.delete('/user/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await contactDetailService.deleteUser(userId);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get user details by email (authentication required)
router.get('/user/email/:email', authenticateToken, async (req, res) => {
  const email = req.params.email;
  try {
    const user = await contactDetailService.getDetailByEmail(email);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Get user by ID (authentication required)
router.get('/user/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await contactDetailService.getById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// Update user by email (authentication required)
router.put('/user/email/:email', authenticateToken, async (req, res) => {
  const email = req.params.email;
  const updateData = req.body;

  try {
    const response = await contactDetailService.findByEmailAndUpdate(email, updateData);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
