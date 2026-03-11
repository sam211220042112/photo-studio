import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = isLogin ? "/login" : "/register"
      const body = isLogin 
        ? { email, password }
        : { username, email, password }

      const res = await fetch("http://localhost:5000" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      // Store user info in localStorage
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(data.user))
        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/")
        }
      } else {
        alert("Registration successful! Please login.")
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "30px",
          textAlign: "center"
        }}>
          <h1 style={{ color: "white", margin: 0, fontSize: "28px" }}>PHOTO STUDIO</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: "10px 0 0" }}>
            {isLogin ? "Welcome back! Please login" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "30px" }}>
          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required={!isLogin}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.3s"
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              style={{
                width: "100%",
                padding: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: "100%",
                padding: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s"
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: "12px",
              background: "#fee",
              color: "#c33",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "transform 0.2s"
            }}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ color: "#666" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError("") }}
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                fontWeight: "600",
                cursor: "pointer",
                marginLeft: "5px"
              }}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
