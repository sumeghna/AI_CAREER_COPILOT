// backend/server.js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Load environment variables
dotenv.config()

// Route imports
const authRoutes = require('./routes/authRoutes')

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ORBIT API is running 🚀' })
})

// Optional: Connect to MongoDB only if URI is provided
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'your-mongodb-uri-here') {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err))
} else {
  console.log('⚠️ MongoDB not configured. Running without database.')
  console.log('   To enable MongoDB:')
  console.log('   1. Create an account at mongodb.com')
  console.log('   2. Create a free cluster')
  console.log('   3. Get your connection string')
  console.log('   4. Add it to .env file as MONGODB_URI')
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 http://localhost:${PORT}`)
})