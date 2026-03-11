import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfiPHmPga8TY__kt90TziEDGfIfyJuRHs",
  authDomain: "photography-b5dc2.firebaseapp.com",
  projectId: "photography-b5dc2",
  storageBucket: "photography-b5dc2.firebasestorage.app",
  messagingSenderId: "800710799184",
  appId: "1:800710799184:web:2485a83848dedbb27c8655",
  measurementId: "G-JVZZ23R90C"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Authentication
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export default app