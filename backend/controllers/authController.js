// backend/controllers/authController.js - In-Memory Storage (No MongoDB needed)
const jwt = require('jsonwebtoken')

// In-memory storage (temporary, resets on server restart)
let users = []

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log('Register attempt:', { name, email })

    // Check if user exists
    const userExists = users.find(u => u.email === email)
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this would be hashed
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8B5CF6&color=fff`,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    console.log('User created:', newUser.email)
    console.log('Total users:', users.length)

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      },
      token: generateToken(newUser.id),
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('Login attempt:', email)

    // Find user
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      console.log('Login failed: Invalid credentials')
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    console.log('Login successful:', user.email)

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token: generateToken(user.id),
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error('GetMe error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}