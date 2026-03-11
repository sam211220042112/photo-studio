import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES = [
  { id: "All", label: "All" },
  { id: "Wedding", label: "Wedding" },
  { id: "Pre Wedding", label: "Pre Wedding" },
  { id: "Mehndi", label: "Mehndi" },
  { id: "Engagement", label: "Engagement" },
  { id: "Drone", label: "Drone" },
  { id: "Cinematic Film", label: "Cinematic Film" },
  { id: "Video", label: "Videos" }
]

export default function Works() {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem("user") || "null")
  const isAdmin = user?.role === "admin"

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/images")
      if (!response.ok) throw new Error("Failed to fetch images")
      const data = await response.json()
      setImages(data)
    } catch (err) {
      console.error("Error fetching images:", err)
      setError("Unable to load images.")
    } finally {
      setLoading(false)
    }
  }

  const filteredImages =
    category === "All" ? images : images.filter((img) => img.category === category)

  const isVideo = (img) => img.category === "Video" || img.url?.endsWith(".mp4")

  return (
    <div className="page-container">
      <div className="section-title">
        <h2>My Works</h2>
        <p style={{ color: "#666" }}>Explore our portfolio</p>
      </div>

      <div className="filter-buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${category === cat.id ? "active" : ""}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading, error, or empty state */}
      {loading && (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div className="spinner"></div>
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ color: "#e63946" }}>{error}</p>
        </div>
      )}
      {!loading && !error && filteredImages.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Gallery is empty</p>
        </div>
      )}

      {/* Gallery grid */}
      {!loading && !error && filteredImages.length > 0 && (
        <div className="gallery-grid">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img._id}
              className="gallery-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelected(img)}
            >
              {isVideo(img) ? (
                <video
                  src={`http://localhost:5000/uploads/${img.url}`}
                  muted
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause()
                    e.target.currentTime = 0
                  }}
                />
              ) : (
                <img
                  src={`http://localhost:5000/uploads/${img.url}`}
                  alt={img.category}
                  loading="lazy"
                />
              )}
              <div className="overlay">
                <h4>{img.category}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="lightbox-close" onClick={() => setSelected(null)}>
              X
            </button>
            {isVideo(selected) ? (
              <video
                src={`http://localhost:5000/uploads/${selected.url}`}
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "90%", maxHeight: "90%" }}
              />
            ) : (
              <img
                src={`http://localhost:5000/uploads/${selected.url}`}
                alt={selected.category}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}