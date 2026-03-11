import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

export default function Navbar({ darkMode, toggleTheme, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const currentUser = user || JSON.parse(localStorage.getItem("user") || "null")

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem("user")
    if (onLogout) onLogout()
    navigate("/login")
  }

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/works", label: "Portfolio" },
    { path: "/videos", label: "Videos" },
    { path: "/booking", label: "Book Now" },
    { path: "/contact", label: "Contact" }
  ]

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-text">PHOTO STUDIO</span>
      </Link>

      <button 
        className="mobile-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            <div className="profile-dropdown" ref={profileRef}>
              <button
                className="profile-button"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="profile-avatar">
                  {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="profile-name">{currentUser.username || "Profile"}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              
              {profileOpen && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <p className="profile-username">{currentUser.username}</p>
                    <p className="profile-email">{currentUser.email}</p>
                    <span className="profile-role">{currentUser.role}</span>
                  </div>
                  <div className="profile-divider"></div>
                  {currentUser.role === "admin" && (
                    <Link to="/admin" className="profile-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 3v18M3 9h18"/>
                      </svg>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="profile-link logout">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 5%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        
        .navbar-brand {
          text-decoration: none;
        }
        
        .brand-text {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #1a1a1a;
          background: linear-gradient(135deg, #1a1a1a 0%, #c9a962 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .navbar-links {
          display: flex;
          gap: 0.5rem;
        }
        
        .nav-link {
          text-decoration: none;
          color: #666;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #c9a962;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: #1a1a1a;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 60%;
        }
        
        .nav-link.active {
          color: #c9a962;
        }
        
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .profile-dropdown {
          position: relative;
        }
        
        .profile-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f5f5f5;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .profile-button:hover {
          background: #eaeaea;
        }
        
        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a962 0%, #e5c77d 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
        }
        
        .profile-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #1a1a1a;
        }
        
        .profile-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 220px;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .profile-info {
          padding: 1rem;
        }
        
        .profile-username {
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }
        
        .profile-email {
          font-size: 0.85rem;
          color: #666;
          margin: 0.25rem 0;
        }
        
        .profile-role {
          display: inline-block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #c9a962;
          font-weight: 600;
        }
        
        .profile-divider {
          height: 1px;
          background: #eee;
        }
        
        .profile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          cursor: pointer;
        }
        
        .profile-link:hover {
          background: #f9f9f9;
          color: #1a1a1a;
        }
        
        .profile-link.logout:hover {
          color: #e63946;
        }
        
        .login-button {
          padding: 0.5rem 1.5rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        
        .login-button:hover {
          background: #c9a962;
          transform: translateY(-2px);
        }
        
        .theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #f5f5f5;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #666;
        }
        
        .theme-toggle:hover {
          background: #eaeaea;
          color: #1a1a1a;
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
        }
        
        .hamburger span {
          display: block;
          height: 2px;
          background: #1a1a1a;
          transition: all 0.3s ease;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        
        @media (max-width: 900px) {
          .mobile-toggle {
            display: block;
          }
          
          .navbar-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1.5rem;
            gap: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            opacity: 0;
            transition: all 0.3s ease;
          }
          
          .navbar-menu.active {
            transform: translateY(0);
            opacity: 1;
          }
          
          .navbar-links {
            flex-direction: column;
            width: 100%;
          }
          
          .nav-link {
            padding: 1rem;
            text-align: center;
          }
          
          .navbar-actions {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .profile-name {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

