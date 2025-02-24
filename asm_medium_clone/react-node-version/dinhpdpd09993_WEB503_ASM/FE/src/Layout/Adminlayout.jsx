import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Dashboard/Sidebar'
import { useSelector } from 'react-redux'

export default function Adminlayout() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  console.log('user from reduxt', user)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    else if (user.role !== 'admin') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
