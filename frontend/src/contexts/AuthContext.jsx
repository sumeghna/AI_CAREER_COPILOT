// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { registerUser, loginUser, getCurrentUser } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if token exists and get user
    const token = localStorage.getItem('orbit_token')
    if (token) {
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      localStorage.removeItem('orbit_token')
      localStorage.removeItem('orbit_user')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      const response = await loginUser({ email, password })
      const { user, token } = response.data
      
      localStorage.setItem('orbit_token', token)
      localStorage.setItem('orbit_user', JSON.stringify(user))
      setUser(user)
      toast.success(`Welcome back, ${user.name}! 🚀`)
      return user
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password'
      toast.error(message)
      throw error
    }
  }

  const signUp = async (name, email, password) => {
    try {
      const response = await registerUser({ name, email, password })
      const { user, token } = response.data
      
      localStorage.setItem('orbit_token', token)
      localStorage.setItem('orbit_user', JSON.stringify(user))
      setUser(user)
      toast.success('Account created! Welcome to ORBIT 🚀')
      return user
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create account'
      toast.error(message)
      throw error
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('orbit_token')
    localStorage.removeItem('orbit_user')
    toast.success('Signed out successfully')
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}