import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/images")
      const data = await response.json()
      if (data && data.length > 0) {
        setGalleryImages(data)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const heroImages = galleryImages.length > 0 
    ? galleryImages.slice(0, 5).map(img => `http://localhost:5000/uploads/${img.url}`)
    : []

  useEffect(() => {
    if (heroImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [heroImages.length])

  const services = [
    { icon: "💒", title: "Wedding", desc: "Complete wedding cinematography & photography" },
    { icon: "💑", title: "Pre Wedding", desc: "Couple photoshoots & romantic videos" },
    { icon: "🎉", title: "Events", desc: "Birthdays, anniversaries & celebrations" },
    { icon: "🚁", title: "Drone", desc: "Aerial photography & videography" },
    { icon: "🎬", title: "Films", desc: "Cinematic films & documentaries" },
    { icon: "📸", title: "Portrait", desc: "Professional portrait sessions" }
  ]

  const featuredImages = galleryImages.slice(0, 4).map(img => `http://localhost:5000/uploads/${img.url}`)

  if (loading) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #c9a962', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'}}></div>
          <p style={{marginTop: '1rem', color: '#666'}}>Loading...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (heroImages.length === 0) {
    return (
      <div className="home-page">
        <section style={{position: 'relative', height: '80vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center', color: 'white', zIndex: 10}}>
            <motion.h1 
              initial={{opacity: 0, y: 30}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration: 0.8}}
              style={{fontSize: '4rem', fontWeight: 300, letterSpacing: '8px', marginBottom: '1rem', textTransform: 'uppercase'}}
            >
              PHOTO STUDIO
            </motion.h1>
            <motion.p 
              initial={{opacity: 0, y: 30}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration: 0.8, delay: 0.2}}
              style={{fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9}}
            >
              Capturing Your Perfect Moments
            </motion.p>
            <motion.div 
              initial={{opacity: 0, y: 30}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration: 0.8, delay: 0.4}}
              style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}
            >
              <Link to="/booking" style={{padding: '1rem 2.5rem', background: '#c9a962', color: 'white', textDecoration: 'none', borderRadius: '30px', fontWeight: 500, letterSpacing: '1px'}}>Book Now</Link>
              <Link to="/works" style={{padding: '1rem 2.5rem', background: 'transparent', color: 'white', border: '2px solid white', textDecoration: 'none', borderRadius: '30px', fontWeight: 500, letterSpacing: '1px'}}>View Portfolio</Link>
            </motion.div>
          </div>
        </section>

        <section style={{padding: '80px 2rem', background: 'white'}}>
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <motion.h2 
              initial={{opacity: 0, y: 30}} 
              whileInView={{opacity: 1, y: 0}} 
              viewport={{once: true}}
              transition={{duration: 0.6}}
              style={{fontSize: '2.5rem', fontWeight: 300, marginBottom: '1.5rem', letterSpacing: '3px'}}
            >
              Welcome to PHOTO STUDIO
            </motion.h2>
            <motion.p 
              initial={{opacity: 0, y: 30}} 
              whileInView={{opacity: 1, y: 0}} 
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2}}
              style={{fontSize: '1.2rem', color: '#666', lineHeight: 1.8}}
            >
              We are a professional photography and cinematography studio dedicated to capturing your most precious moments with elegance and artistry.
            </motion.p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem', flexWrap: 'wrap'}}>
              <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.3}} style={{textAlign: 'center'}}>
                <span style={{display: 'block', fontSize: '3rem', fontWeight: 300, color: '#c9a962'}}>500+</span>
                <span style={{fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#666'}}>Events</span>
              </motion.div>
              <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.4}} style={{textAlign: 'center'}}>
                <span style={{display: 'block', fontSize: '3rem', fontWeight: 300, color: '#c9a962'}}>10+</span>
                <span style={{fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#666'}}>Years</span>
              </motion.div>
              <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.5}} style={{textAlign: 'center'}}>
                <span style={{display: 'block', fontSize: '3rem', fontWeight: 300, color: '#c9a962'}}>100%</span>
                <span style={{fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#666'}}>Satisfaction</span>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{padding: '80px 2rem', background: '#f8f8f8'}}>
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem', letterSpacing: '3px'}}>Our Services</h2>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>Comprehensive photography solutions</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
                whileHover={{y: -10}}
                style={{padding: '2.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', cursor: 'pointer'}}
              >
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{service.icon}</div>
                <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px'}}>{service.title}</h3>
                <p style={{color: '#666', fontSize: '0.95rem'}}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section style={{padding: '80px 2rem', background: '#1a1a1a', color: 'white', textAlign: 'center'}}>
          <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
            <h2 style={{fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem'}}>Ready to Book?</h2>
            <p style={{fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem'}}>Let us create beautiful memories</p>
            <Link to="/booking" style={{padding: '1rem 3rem', background: '#c9a962', color: 'white', textDecoration: 'none', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 500}}>Book Now</Link>
          </motion.div>
        </section>
      </div>
    )
  }

  return (
    <div className="home-page">
      <section style={{position: 'relative', height: '100vh', overflow: 'hidden'}}>
        {heroImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt=""
            initial={{opacity: 0}}
            animate={{opacity: index === currentSlide ? 1 : 0}}
            transition={{duration: 1}}
            style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ))}
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)'}}></div>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 10, width: '100%'}}>
          <motion.h1 initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}} style={{fontSize: '4rem', fontWeight: 300, letterSpacing: '8px', marginBottom: '1rem', textTransform: 'uppercase'}}>
            PHOTO STUDIO
          </motion.h1>
          <motion.p initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.2}} style={{fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9}}>
            Capturing Your Perfect Moments
          </motion.p>
          <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.4}} style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/booking" style={{padding: '1rem 2.5rem', background: '#c9a962', color: 'white', textDecoration: 'none', borderRadius: '30px', fontWeight: 500}}>Book Now</Link>
            <Link to="/works" style={{padding: '1rem 2.5rem', background: 'transparent', color: 'white', border: '2px solid white', textDecoration: 'none', borderRadius: '30px', fontWeight: 500}}>View Portfolio</Link>
          </motion.div>
        </div>
        <div style={{position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 10}}>
          {heroImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} style={{width: index === currentSlide ? '40px' : '12px', height: '3px', background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0}}></button>
          ))}
        </div>
      </section>

      <section style={{padding: '80px 2rem', background: 'white'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 300, marginBottom: '1.5rem'}}>Welcome to PHOTO STUDIO</h2>
          <p style={{fontSize: '1.2rem', color: '#666', lineHeight: 1.8}}>Professional photography and cinematography studio dedicated to capturing your precious moments.</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem', flexWrap: 'wrap'}}>
            <div style={{textAlign: 'center'}}><span style={{display: 'block', fontSize: '3rem', color: '#c9a962'}}>500+</span><span style={{fontSize: '0.9rem', textTransform: 'uppercase', color: '#666'}}>Events</span></div>
            <div style={{textAlign: 'center'}}><span style={{display: 'block', fontSize: '3rem', color: '#c9a962'}}>10+</span><span style={{fontSize: '0.9rem', textTransform: 'uppercase', color: '#666'}}>Years</span></div>
            <div style={{textAlign: 'center'}}><span style={{display: 'block', fontSize: '3rem', color: '#c9a962'}}>100%</span><span style={{fontSize: '0.9rem', textTransform: 'uppercase', color: '#666'}}>Satisfaction</span></div>
          </div>
        </div>
      </section>

      <section style={{padding: '80px 2rem', background: '#f8f8f8'}}>
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem'}}>Our Services</h2>
        <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>Comprehensive photography solutions</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
          {services.map((service, index) => (
            <motion.div key={index} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5, delay: index * 0.1}} whileHover={{y: -10}} style={{padding: '2.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{service.icon}</div>
              <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem'}}>{service.title}</h3>
              <p style={{color: '#666'}}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {featuredImages.length > 0 && (
        <section style={{padding: '80px 2rem', background: 'white'}}>
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem'}}>Featured Work</h2>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>A glimpse into our recent projects</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto'}}>
            {featuredImages.map((img, index) => (
              <motion.div key={index} initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{duration: 0.5, delay: index * 0.1}} whileHover={{scale: 1.03}} style={{borderRadius: '8px', overflow: 'hidden', cursor: 'pointer'}}>
                <img src={img} alt={`Work ${index + 1}`} style={{width: '100%', height: '250px', objectFit: 'cover', display: 'block'}} />
              </motion.div>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Link to="/works" style={{padding: '1rem 2rem', background: 'transparent', color: '#1a1a1a', border: '2px solid #1a1a1a', textDecoration: 'none', borderRadius: '30px'}}>View All Work</Link>
          </div>
        </section>
      )}

      <section style={{padding: '80px 2rem', background: '#1a1a1a', color: 'white', textAlign: 'center'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem'}}>Ready to Capture Your Moments?</h2>
        <p style={{fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem'}}>Book your session today</p>
        <Link to="/booking" style={{padding: '1rem 3rem', background: '#c9a962', color: 'white', textDecoration: 'none', borderRadius: '30px', fontSize: '1.1rem'}}>Book Now</Link>
      </section>
    </div>
  )
}

