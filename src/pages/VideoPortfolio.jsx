import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoPortfolio() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user") || "null")
  const isAdmin = user?.role === "admin"

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/images")
      const data = await response.json()
      const videoItems = data.filter(
        (img) =>
          img.category === "Video" ||
          img.url?.endsWith(".mp4") ||
          img.url?.endsWith(".webm")
      )
      setVideos(videoItems)
    } catch (err) {
      console.error("Error fetching videos:", err)
    } finally {
      setLoading(false)
    }
  }

  const deleteVideo = async (id, e) => {
    e.stopPropagation()
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      const response = await fetch(`http://localhost:5000/images/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        alert("Deleted successfully!")
        fetchVideos()
      } else {
        alert("Failed to delete")
      }
    } catch (err) {
      console.error("Error deleting:", err)
      alert("Failed to delete")
    }
  }

  return (
    <div className="page-container">
      <div className="section-title">
        <h2>Video Portfolio</h2>
        <p style={{ color: "#666" }}>Watch our cinematic productions</p>
      </div>

      {/* Main Video */}
      <div className="video-container" style={{ marginBottom: "3rem" }}>
        <video controls autoPlay muted loop playsInline poster="/photos/1.JPG">
          <source src="/videos/BESTIE.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Loading or Videos Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div className="spinner" style={{ margin: "0 auto" }}></div>
        </div>
      ) : videos.length > 0 ? (
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>
            More Videos
          </h3>
          <div className="gallery-grid">
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedVideo(video)}
                style={{ aspectRatio: "16/9", position: "relative" }}
              >
                <video
                  src={`http://localhost:5000/uploads/${video.url}`}
                  muted
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause()
                    e.target.currentTime = 0
                  }}
                />
                <div className="overlay">
                  <h4>Video {video.category}</h4>
                </div>
                {isAdmin && (
                  <button
                    onClick={(e) => deleteVideo(video._id, e)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No videos found.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 1000,
            }}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "transparent",
                color: "#fff",
                fontSize: "1.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <video
              src={`http://localhost:5000/uploads/${selectedVideo.url}`}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}