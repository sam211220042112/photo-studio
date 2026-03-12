
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const path = require("path")

const Images = require("./models/Images")
const User = require("./models/User")
const Booking = require("./models/Booking")

const app = express()

app.use(cors())
app.use(express.json())

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/photographyApp"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "samrudhmshetty212004@gmail.com"
const EMAIL_USER = process.env.EMAIL_USER || "samrudhmshetty212004@gmail.com"
const EMAIL_PASS = process.env.EMAIL_PASS || "jjdl rrzz iiby qjlx"

// CONNECT DATABASE
mongoose.connect(MONGODB_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// EMAIL CONFIGURATION FOR NOTIFICATIONS
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("Email configuration error:", error.message);
  } else {
    console.log("Email server is ready to send messages");
  }
})

// CONTACT INFO FILE
const CONTACT_FILE = path.join(__dirname, "contact.json")

// Initialize contact file if not exists
if (!fs.existsSync(CONTACT_FILE)) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify({
    email: "samcinematics@gmail.com",
    phone: "+91 9876543210",
    address: "Mangalore, Karnataka",
    instagram: "@samcinematics",
    facebook: "Sam Cinematics"
  }))
}

// STORAGE CONFIGURATION
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname)
  }
})

const upload = multer({storage})

// SERVE UPLOADED IMAGES
app.use("/uploads",express.static("uploads"))

// REGISTER API
app.post("/register", async (req,res)=>{
  try{
    const { username, email, password } = req.body
    
    const existingUser = await User.findOne({ $or: [{email}, {username}] })
    if(existingUser){
      return res.status(400).json({ message: "User already exists" })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const role = email === ADMIN_EMAIL ? "admin" : "user"
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    })
    
    await newUser.save()
    
    res.json({ message: "Registration successful", role })
  }catch(err){
    res.status(500).json({ message: "Registration failed", error: err.message })
  }
})

// LOGIN API
app.post("/login", async (req,res)=>{
  try{
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({ message: "User not found" })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({ message: "Invalid password" })
    }
    
    try{
      await transporter.sendMail({
        from: "samrudhmshetty212004@gmail.com",
        to: ADMIN_EMAIL,
        subject: "New Login - Photography App",
        html: `
          <h2>New Login Detected</h2>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Role:</strong> ${user.role}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `
      })
    }catch(emailErr){
      console.log("Email notification failed:", emailErr.message)
    }
    
    res.json({ 
      message: "Login successful", 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      }
    })
  }catch(err){
    res.status(500).json({ message: "Login failed", error: err.message })
  }
})

// UPLOAD IMAGE API
app.post("/upload", upload.single("image"), async (req,res)=>{
  try{
    const newImage = new Images({
      url:req.file.filename,
      category:req.body.category
    })
    await newImage.save()
    res.json({ message: "Image Uploaded", file:req.file.filename })
  }catch(err){
    res.status(500).json(err)
  }
})

// UPLOAD VIDEO API
app.post("/upload-video", upload.single("video"), async (req,res)=>{
  try{
    const newVideo = new Images({
      url:req.file.filename,
      category:req.body.category || "Video"
    })
    await newVideo.save()
    res.json({ message: "Video Uploaded", file:req.file.filename })
  }catch(err){
    res.status(500).json(err)
  }
})

// GET ALL IMAGES
app.get("/images", async (req,res)=>{
  try{
    const images = await Images.find()
    res.json(images)
  }catch(err){
    res.status(500).json(err)
  }
})

// DELETE IMAGE/VIDEO API
app.delete("/images/:id", async (req,res)=>{
  try{
    const image = await Images.findById(req.params.id)
    if(!image){
      return res.status(404).json({ message: "Image not found" })
    }
    
    // Delete file from uploads folder
    const filePath = path.join(__dirname, "uploads", image.url)
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath)
    }
    
    // Delete from database
    await Images.findByIdAndDelete(req.params.id)
    
    res.json({ message: "Deleted successfully" })
  }catch(err){
    res.status(500).json({ message: "Delete failed", error: err.message })
  }
})

// GET CONTACT INFO
app.get("/contact-info", (req,res)=>{
  try{
    const contactData = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"))
    res.json(contactData)
  }catch(err){
    res.status(500).json({ message: "Failed to get contact info" })
  }
})

// UPDATE CONTACT INFO
app.put("/contact-info", (req,res)=>{
  try{
    const { email, phone, address, instagram, facebook } = req.body
    
    const contactData = {
      email: email || "",
      phone: phone || "",
      address: address || "",
      instagram: instagram || "",
      facebook: facebook || ""
    }
    
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contactData, null, 2))
    
    res.json({ message: "Contact info updated successfully" })
  }catch(err){
    res.status(500).json({ message: "Failed to update contact info" })
  }
})

// GET ALL BOOKINGS
app.get("/bookings", async (req,res)=>{
  try{
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  }catch(err){
    res.status(500).json({ message: "Failed to get bookings", error: err.message })
  }
})

// UPDATE BOOKING STATUS
app.put("/bookings/:id", async (req,res)=>{
  try{
    const { status } = req.body
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if(!booking){
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json({ message: "Status updated", booking })
  }catch(err){
    res.status(500).json({ message: "Failed to update booking", error: err.message })
  }
})

// DELETE BOOKING
app.delete("/bookings/:id", async (req,res)=>{
  try{
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: "Booking deleted" })
  }catch(err){
    res.status(500).json({ message: "Failed to delete booking", error: err.message })
  }
})

// BOOKING API
app.post("/booking", async (req,res)=>{
  try{
    const { name, email, phone, eventType, date, location, message } = req.body
    
    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      eventType,
      date,
      location,
      message,
      status: "pending"
    })
    
    await newBooking.save()
    
    // Send email notification to admin
    try{
      await transporter.sendMail({
        from: "samrudhmshetty212004@gmail.com",
        to: ADMIN_EMAIL,
        subject: `New Booking: ${eventType} - ${name}`,
        html: `
          <h2>New Booking Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Message:</strong> ${message || "No message"}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `
      })
    }catch(emailErr){
      console.log("Booking email notification failed:", emailErr.message)
    }
    
    res.json({ message: "Booking submitted successfully", booking: newBooking })
  }catch(err){
    res.status(500).json({ message: "Booking failed", error: err.message })
  }
})

// START SERVER
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})


