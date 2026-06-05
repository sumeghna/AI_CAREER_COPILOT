import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LogOut } from 'lucide-react'

const Dashboard = () => {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Dashboard Coming Soon</h2>
          <p className="text-gray-400">Your career insights will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard