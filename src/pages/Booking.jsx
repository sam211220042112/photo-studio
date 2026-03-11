import { useState } from "react"
import { motion } from "framer-motion"

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    date: "",
    location: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error("Failed to submit booking")
      }

      setSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "Wedding",
          date: "",
          location: "",
          message: ""
        })
      }, 5000)
    } catch (err) {
      console.error(err)
      setError("Failed to submit booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <div className="section-title">
        <h2>Book Your Session</h2>
        <p style={{ color: '#666' }}>Let's create something beautiful together</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div 
          className="booking-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted ? (
            <motion.div 
              style={{ textAlign: 'center', padding: '3rem 2rem' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{ color: '#c9a962', marginBottom: '1rem', fontSize: '1.8rem' }}>Thank You!</h3>
              <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your booking request has been submitted successfully.</p>
              <p style={{ color: '#999', fontSize: '0.95rem' }}>We will get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre Wedding">Pre Wedding</option>
                    <option value="Mehndi">Mehndi</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Drone">Drone Shoot</option>
                    <option value="Videography">Videography</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="date">Event Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Event Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City, Venue name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell us more about your event</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share details about your event - number of guests, special moments you want captured, any specific requirements..."
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              {error && (
                <motion.div 
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    background: 'rgba(230, 57, 70, 0.1)',
                    color: '#e63946',
                    border: '1px solid rgba(230, 57, 70, 0.3)',
                    textAlign: 'center'
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', padding: '18px', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          style={{ 
            marginTop: '2.5rem', 
            textAlign: 'center', 
            padding: '2rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '16px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Prefer to talk directly?
          </p>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            Call us: <a href="tel:9876543210" style={{ color: '#c9a962', textDecoration: 'none', fontWeight: '600' }}>+91 9876543210</a>
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>
            Available Monday - Saturday, 9AM - 7PM
          </p>
        </motion.div>
      </div>

      <style>{`
        .booking-card {
          background: white;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .form-group {
          margin-bottom: 1.25rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #1a1a1a;
          font-size: 0.95rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #c9a962;
          box-shadow: 0 0 0 4px rgba(201, 169, 98, 0.15);
          background: white;
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #aaa;
        }
      `}</style>
    </div>
  )
}

