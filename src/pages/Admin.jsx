import React, { useState, useEffect } from "react"

export default function Admin() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadType, setUploadType] = useState("image")
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [category, setCategory] = useState("Wedding")
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState("")
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "", address: "", instagram: "", facebook: "" })
  const [contactMsg, setContactMsg] = useState("")
  const [deletingId, setDeletingId] = useState(null)
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => { 
    fetchImages() 
    fetchContactInfo() 
    fetchBookings()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/images")
      const data = await response.json()
      setImages(data)
    } catch (err) { console.error("Error:", err) }
    setLoading(false)
  }

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/contact-info")
      const data = await response.json()
      setContactInfo(data)
    } catch (err) { console.error("Error:", err) }
  }

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/bookings")
      const data = await response.json()
      setBookings(data)
    } catch (err) { console.error("Error:", err) }
    setBookingsLoading(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setUploadMsg("")
    const formData = new FormData()
    formData.append(uploadType, selectedFile)
    formData.append("category", category)
    try {
      const endpoint = uploadType === "image" ? "/upload" : "/upload-video"
      const response = await fetch(`http://localhost:5000${endpoint}`, { method: "POST", body: formData })
      if (response.ok) {
        setUploadMsg("Uploaded successfully!")
        setSelectedFile(null)
        setPreview(null)
        fetchImages()
      } else { setUploadMsg("Upload failed") }
    } catch (err) { setUploadMsg("Error uploading") }
    setUploading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media?")) return
    setDeletingId(id)
    try {
      const response = await fetch(`http://localhost:5000/images/${id}`, { method: "DELETE" })
      if (response.ok) { 
        alert("Deleted successfully!")
        fetchImages() 
      } else { alert("Delete failed") }
    } catch (err) { alert("Error deleting") }
    setDeletingId(null)
  }

  const handleContactUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/contact-info", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(contactInfo) })
      if (response.ok) setContactMsg("Updated successfully!")
    } catch (err) { setContactMsg("Error updating") }
  }

  const handleUpdateBookingStatus = async (id, status) => {
    setUpdatingId(id)
    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, { 
        method: "PUT", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status }) 
      })
      if (response.ok) {
        alert(`Booking marked as ${status}`)
        fetchBookings()
      }
    } catch (err) { alert("Error updating booking") }
    setUpdatingId(null)
  }

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return
    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, { method: "DELETE" })
      if (response.ok) {
        alert("Booking deleted")
        fetchBookings()
      }
    } catch (err) { alert("Error deleting booking") }
  }

  const CATEGORIES = ["Wedding", "Pre Wedding", "Engagement", "Mehndi", "Events", "Portrait", "Drone", "Video"]

  const containerStyle = { padding: "2rem", maxWidth: "1200px", margin: "0 auto" }
  const cardStyle = { background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }
  const buttonStyle = (active) => ({ padding: "0.75rem 1.5rem", background: active ? "#c9a962" : "#eee", color: active ? "white" : "#333", border: "none", borderRadius: "8px", cursor: "pointer" })

  return React.createElement("div", { style: containerStyle },
    React.createElement("div", { style: { marginBottom: "2rem" } },
      React.createElement("h1", { style: { fontSize: "2rem", marginBottom: "0.5rem" } }, "Admin Panel - PHOTO STUDIO"),
      React.createElement("p", { style: { color: "#666" } }, "Manage your portfolio, bookings, and contact info")
    ),
    React.createElement("div", { style: { display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" } },
      React.createElement("button", { onClick: () => setActiveTab("upload"), style: buttonStyle(activeTab === "upload") }, "Upload Media"),
      React.createElement("button", { onClick: () => setActiveTab("manage"), style: buttonStyle(activeTab === "manage") }, "Manage Gallery"),
      React.createElement("button", { onClick: () => setActiveTab("bookings"), style: buttonStyle(activeTab === "bookings") }, "Bookings"),
      React.createElement("button", { onClick: () => setActiveTab("contact"), style: buttonStyle(activeTab === "contact") }, "Contact Info")
    ),
    
    // Upload Tab
    activeTab === "upload" && React.createElement("div", { style: cardStyle },
      React.createElement("h2", { style: { marginBottom: "1.5rem" } }, "Upload Media"),
      React.createElement("div", { style: { display: "flex", gap: "1rem", marginBottom: "1.5rem" } },
        React.createElement("button", { onClick: () => { setUploadType("image"); setPreview(null); setSelectedFile(null) }, style: { padding: "0.5rem 1rem", background: uploadType === "image" ? "#c9a962" : "transparent", color: uploadType === "image" ? "white" : "#333", border: "1px solid #c9a962", borderRadius: "6px", cursor: "pointer" } }, "Image"),
        React.createElement("button", { onClick: () => { setUploadType("video"); setPreview(null); setSelectedFile(null) }, style: { padding: "0.5rem 1rem", background: uploadType === "video" ? "#c9a962" : "transparent", color: uploadType === "video" ? "white" : "#333", border: "1px solid #c9a962", borderRadius: "6px", cursor: "pointer" } }, "Video")
      ),
      React.createElement("div", { style: { marginBottom: "1.5rem" } },
        React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Category"),
        React.createElement("select", { value: category, onChange: (e) => setCategory(e.target.value), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } },
          CATEGORIES.map((cat) => React.createElement("option", { key: cat, value: cat }, cat))
        )
      ),
      React.createElement("div", { style: { marginBottom: "1.5rem" } },
        React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Select File"),
        React.createElement("input", { type: "file", accept: uploadType === "image" ? "image/*" : "video/*", onChange: handleFileChange, style: { width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" } })
      ),
      preview && React.createElement("div", { style: { marginBottom: "1.5rem" } },
        React.createElement("p", { style: { marginBottom: "0.5rem" } }, "Preview:"),
        uploadType === "image" ? React.createElement("img", { src: preview, alt: "Preview", style: { maxWidth: "300px", borderRadius: "8px" } }) : React.createElement("video", { src: preview, controls: true, style: { maxWidth: "300px", borderRadius: "8px" } })
      ),
      React.createElement("button", { onClick: handleUpload, disabled: !selectedFile || uploading, style: { padding: "0.75rem 2rem", background: !selectedFile || uploading ? "#ccc" : "#c9a962", color: "white", border: "none", borderRadius: "8px", cursor: selectedFile && !uploading ? "pointer" : "not-allowed" } }, uploading ? "Uploading..." : "Upload"),
      uploadMsg && React.createElement("p", { style: { marginTop: "1rem", color: uploadMsg.includes("success") ? "green" : "red" } }, uploadMsg)
    ),
    
    // Manage Gallery Tab
    activeTab === "manage" && React.createElement("div", { style: cardStyle },
      React.createElement("h2", { style: { marginBottom: "1.5rem" } }, "Manage Gallery - Delete Photos/Videos"),
      loading ? React.createElement("p", null, "Loading...") : images.length === 0 ? React.createElement("p", null, "No media uploaded yet.") :
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" } },
          images.map((img) => 
            React.createElement("div", { key: img._id, style: { position: "relative", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" } },
              img.category === "Video" || img.url.match(/\.(mp4|webm|ogg)$/i) ? React.createElement("video", { src: `http://localhost:5000/uploads/${img.url}`, style: { width: "100%", height: "150px", objectFit: "cover" } }) : React.createElement("img", { src: `http://localhost:5000/uploads/${img.url}`, alt: img.category, style: { width: "100%", height: "150px", objectFit: "cover" } }),
              React.createElement("div", { style: { padding: "0.5rem", background: "white" } },
                React.createElement("p", { style: { fontSize: "0.875rem", fontWeight: "500", margin: 0 } }, img.category)
              ),
              React.createElement("button", { onClick: () => handleDelete(img._id), disabled: deletingId === img._id, style: { position: "absolute", top: "8px", right: "8px", background: deletingId === img._id ? "#999" : "red", color: "white", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: deletingId === img._id ? "not-allowed" : "pointer", fontSize: "0.75rem" } }, deletingId === img._id ? "..." : "Delete")
            )
          )
        )
    ),
    
    // Bookings Tab
    activeTab === "bookings" && React.createElement("div", { style: cardStyle },
      React.createElement("h2", { style: { marginBottom: "1.5rem" } }, "Bookings Management"),
      bookingsLoading ? React.createElement("p", null, "Loading...") : bookings.length === 0 ? React.createElement("p", null, "No bookings yet.") :
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } },
          bookings.map((booking) => 
            React.createElement("div", { key: booking._id, style: { padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", background: "#fafafa" } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" } },
                React.createElement("div", null,
                  React.createElement("h3", { style: { margin: "0 0 0.5rem 0", fontSize: "1.1rem" } }, booking.name),
                  React.createElement("p", { style: { margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" } }, `📧 ${booking.email}`),
                  React.createElement("p", { style: { margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" } }, `📞 ${booking.phone}`),
                  React.createElement("p", { style: { margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" } }, `🎉 ${booking.eventType}`),
                  React.createElement("p", { style: { margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" } }, `📅 ${booking.date}`),
                  React.createElement("p", { style: { margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" } }, `📍 ${booking.location}`),
                  booking.message && React.createElement("p", { style: { margin: "0.5rem 0", color: "#666", fontSize: "0.9rem", fontStyle: "italic" } }, `💬 ${booking.message}`)
                ),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" } },
                  React.createElement("span", { style: { padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "600", background: booking.status === "pending" ? "#ffc107" : booking.status === "confirmed" ? "#28a745" : "#dc3545", color: "white" } }, booking.status.toUpperCase()),
                  React.createElement("div", { style: { display: "flex", gap: "0.5rem" } },
                    booking.status !== "confirmed" && React.createElement("button", { onClick: () => handleUpdateBookingStatus(booking._id, "confirmed"), disabled: updatingId === booking._id, style: { padding: "0.4rem 0.8rem", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: updatingId === booking._id ? "not-allowed" : "pointer", fontSize: "0.8rem" } }, "Confirm"),
                    booking.status !== "completed" && React.createElement("button", { onClick: () => handleUpdateBookingStatus(booking._id, "completed"), disabled: updatingId === booking._id, style: { padding: "0.4rem 0.8rem", background: "#17a2b8", color: "white", border: "none", borderRadius: "4px", cursor: updatingId === booking._id ? "not-allowed" : "pointer", fontSize: "0.8rem" } }, "Complete"),
                    React.createElement("button", { onClick: () => handleDeleteBooking(booking._id), style: { padding: "0.4rem 0.8rem", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" } }, "Delete")
                  )
                )
              )
            )
          )
        )
    ),
    
    // Contact Tab
    activeTab === "contact" && React.createElement("div", { style: cardStyle },
      React.createElement("h2", { style: { marginBottom: "1.5rem" } }, "Contact Information"),
      React.createElement("div", { style: { display: "grid", gap: "1rem", maxWidth: "500px" } },
        React.createElement("div", null, React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Phone"), React.createElement("input", { type: "tel", value: contactInfo.phone || "", onChange: (e) => setContactInfo({ ...contactInfo, phone: e.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } })),
        React.createElement("div", null, React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Email"), React.createElement("input", { type: "email", value: contactInfo.email || "", onChange: (e) => setContactInfo({ ...contactInfo, email: e.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } })),
        React.createElement("div", null, React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Address"), React.createElement("input", { type: "text", value: contactInfo.address || "", onChange: (e) => setContactInfo({ ...contactInfo, address: e.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } })),
        React.createElement("div", null, React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Instagram"), React.createElement("input", { type: "text", value: contactInfo.instagram || "", onChange: (e) => setContactInfo({ ...contactInfo, instagram: e.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } })),
        React.createElement("div", null, React.createElement("label", { style: { display: "block", marginBottom: "0.5rem", fontWeight: "500" } }, "Facebook"), React.createElement("input", { type: "text", value: contactInfo.facebook || "", onChange: (e) => setContactInfo({ ...contactInfo, facebook: e.target.value }), style: { width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd" } })),
        React.createElement("button", { onClick: handleContactUpdate, style: { padding: "0.75rem 2rem", background: "#c9a962", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "1rem" } }, "Save Changes"),
        contactMsg && React.createElement("p", { style: { color: "green" } }, contactMsg)
      )
    )
  )
}

