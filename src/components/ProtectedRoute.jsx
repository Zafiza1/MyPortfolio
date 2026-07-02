import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { verifyToken, getCurrentUser } from "../api"; 

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null)

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('token')
      if (!token) return setAllowed(false)

      try {
        const user = await verifyToken()
        setAllowed(user.role === 'admin')
      } catch (error) {
        setAllowed(false)
      }
    }
    check()
  }, [])

  if (allowed === null) return null
  if (!allowed) return <Navigate to="/login" />

  return children
}