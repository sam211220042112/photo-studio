import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home.jsx"
import Works from "./pages/Works"
import VideoPortfolio from "./pages/VideoPortfolio"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Booking from "./pages/Booking"

import "./styles/style.css"

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

// Public Route Component - accessible without login
function PublicRoute({ children }) {
  return children
}

// Logout Component
function Logout() {
  localStorage.removeItem("user")
  return <Navigate to="/login" replace />
}

// Layout Component to handle Navbar/Footer visibility
function Layout({ children }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const isLoginPage = location.pathname === "/login"

  return (
    <div className="app">
      {!isLoginPage && <Navbar darkMode={darkMode} toggleTheme={toggleTheme} user={user} onLogout={handleLogout} />}
      <main>
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Public Pages - Accessible without login */}
        <Route path="/" element={
          <Layout>
            <PublicRoute>
              <Home />
            </PublicRoute>
          </Layout>
        } />
        <Route path="/works" element={
          <Layout>
            <PublicRoute>
              <Works />
            </PublicRoute>
          </Layout>
        } />
        <Route path="/videos" element={
          <Layout>
            <PublicRoute>
              <VideoPortfolio />
            </PublicRoute>
          </Layout>
        } />
        <Route path="/booking" element={
          <Layout>
            <PublicRoute>
              <Booking />
            </PublicRoute>
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <PublicRoute>
              <Contact />
            </PublicRoute>
          </Layout>
        } />
        
        {/* Protected Pages - Require login */}
        <Route path="/admin" element={
          <Layout>
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          </Layout>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

