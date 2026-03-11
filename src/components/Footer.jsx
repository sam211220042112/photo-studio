import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/works", label: "Portfolio" },
    { path: "/videos", label: "Videos" },
    { path: "/booking", label: "Book Now" },
    { path: "/contact", label: "Contact" }
  ]
  
  const socialLinks = [
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: "https://instagram.com/samcinematics",
      label: "Instagram"
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: "https://facebook.com",
      label: "Facebook"
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: "https://youtube.com",
      label: "YouTube"
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: "https://linkedin.com",
      label: "LinkedIn"
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              PHOTO STUDIO
            </Link>
            <p className="footer-tagline">
              Capturing timeless moments through cinematic storytelling
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+919876543210">+91 9876543210</a>
              </li>
              <li>
                <a href="mailto:samcinematics@gmail.com">samcinematics@gmail.com</a>
              </li>
              <li>Mangalore, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} PHOTO STUDIO. All rights reserved.</p>
          <p className="footer-credit">
            Crafted with passion for visual storytelling
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #0a0a0a;
          color: white;
          padding: 4rem 5% 2rem;
          margin-top: 4rem;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: white;
          text-decoration: none;
          background: linear-gradient(135deg, #c9a962 0%, #e5c77d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .footer-tagline {
          color: #888;
          margin: 1rem 0;
          line-height: 1.6;
        }
        
        .footer-social {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: #c9a962;
          transform: translateY(-3px);
        }
        
        .footer-links h4,
        .footer-contact h4 {
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .footer-links ul,
        .footer-contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li,
        .footer-contact li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a,
        .footer-contact a {
          color: #888;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }
        
        .footer-links a:hover,
        .footer-contact a:hover {
          color: #c9a962;
        }
        
        .footer-contact li {
          color: #888;
          font-size: 0.95rem;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-bottom p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .footer-credit {
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .footer-social {
            justify-content: center;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

