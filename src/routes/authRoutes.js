const express = require('express');
const router = express.Router();
const authService=require('../controllers/authController')

router.post('/register', async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
