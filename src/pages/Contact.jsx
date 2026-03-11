import { useState, useEffect } from "react"

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    instagram: "",
    facebook: ""
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  async function fetchContactInfo() {
    try {
      const response = await fetch("http://localhost:5000/contact-info")
      if (response.ok) {
        const data = await response.json()
        setContactInfo(data)
      }
    } catch (err) {
      console.error("Error fetching contact info:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatPhone = (phone) => phone.replace(/\D/g, '')

  return (
    <div className="page-container">
      <div className="section-title">
        <h2>Get In Touch</h2>
        <p>Let's create something beautiful together</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="contact-wrapper">
          {/* Contact Cards */}
          <div className="contact-cards">
            <a href={`tel:${formatPhone(contactInfo.phone || '9876543210')}`} className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span className="card-label">Phone</span>
              <span className="card-value">{contactInfo.phone || "+91 9876543210"}</span>
            </a>

            <a href={`mailto:${contactInfo.email || 'samcinematics@gmail.com'}`} className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span className="card-label">Email</span>
              <span className="card-value">{contactInfo.email || "samcinematics@gmail.com"}</span>
            </a>

            <div className="contact-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="card-label">Studio</span>
              <span className="card-value">{contactInfo.address || "Mangalore, Karnataka"}</span>
            </div>

            <a 
              href={contactInfo.instagram ? `https://instagram.com/${contactInfo.instagram.replace('@', '')}` : "https://instagram.com/samcinematics"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <span className="card-label">Instagram</span>
              <span className="card-value">{contactInfo.instagram || "@samcinematics"}</span>
            </a>
          </div>

          {/* Business Hours */}
          <div className="hours-card">
            <h3>Business Hours</h3>
            <div className="hours-list">
              <div className="hours-row">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Saturday</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Sunday</span>
                <span>By Appointment</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="contact-cta">
            <h3>Ready to book your session?</h3>
            <p>Get in touch with us to discuss your photography needs</p>
            <a href="/booking" className="cta-button">Book Now</a>
          </div>
        </div>
      )}

      <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          padding: 4rem;
        }

        .contact-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          border-color: #c9a962;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }

        .contact-card:hover .card-icon {
          background: linear-gradient(135deg, #c9a962 0%, #e5c77d 100%);
          color: white;
        }

        .card-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
        }

        .card-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: #1a1a1a;
        }

        .hours-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .hours-card h3 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          font-size: 1.25rem;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .hours-row:last-child {
          border-bottom: none;
        }

        .hours-row span:first-child {
          font-weight: 500;
          color: #1a1a1a;
        }

        .hours-row span:last-child {
          color: #666;
        }

        .contact-cta {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          color: white;
        }

        .contact-cta h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .contact-cta p {
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 36px;
          background: linear-gradient(135deg, #c9a962 0%, #e5c77d 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(201, 169, 98, 0.4);
        }

        @media (max-width: 768px) {
          .contact-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .contact-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

