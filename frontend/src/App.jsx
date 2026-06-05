// src/App.jsx - ONLY ROUTES (No UI code)
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import OrbitHome from './OrbitHome'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  if (!user) return <Navigate to="/signin" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/" element={<OrbitHome />} />
      <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App