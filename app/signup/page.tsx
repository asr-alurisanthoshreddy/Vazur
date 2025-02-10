"use client"

import { useState } from "react"
import Link from "next/link"
import { FaGoogle, FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({ fullName: "", email: "", password: "", confirmPassword: "" })
  const [passwordStrength, setPasswordStrength] = useState("")

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Too short"
    if (!/[A-Z]/.test(password)) return "Add uppercase letter"
    if (!/[a-z]/.test(password)) return "Add lowercase letter"
    if (!/[0-9]/.test(password)) return "Add number"
    if (!/[@$!%*?&]/.test(password)) return "Add special character"
    return "Strong"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === "password") {
      setPasswordStrength(validatePassword(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let newErrors = { fullName: "", email: "", password: "", confirmPassword: "" }

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email"
    if (passwordStrength !== "Strong") newErrors.password = "Password is not strong enough"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    if (Object.values(newErrors).every((err) => err === "")) {
      alert("Signup successful!") // Replace with API call
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
        <p className="text-center text-gray-400 mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center bg-gray-700 rounded px-4 py-2 border border-gray-600">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
              value={form.fullName}
              onChange={handleChange}
<<<<<<< HEAD
            />
=======
            /> Full Name
>>>>>>> 44420dfa6495582b3e33cc9c46d68664d80d1920
          </div>
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          <div className="flex items-center bg-gray-700 rounded px-4 py-2 border border-gray-600">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
              value={form.email}
              onChange={handleChange}
<<<<<<< HEAD
            />
=======
            /> Email
>>>>>>> 44420dfa6495582b3e33cc9c46d68664d80d1920
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="flex items-center bg-gray-700 rounded px-4 py-2 border border-gray-600">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {passwordStrength && <p className={`text-sm ${passwordStrength === "Strong" ? "text-green-500" : "text-yellow-400"}`}>{passwordStrength}</p>}
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <div className="flex items-center bg-gray-700 rounded px-4 py-2 border border-gray-600">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="bg-transparent text-white flex-1 ml-2 focus:outline-none"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button type="submit" className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-bold">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account? {" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <Link href="#"><FaGoogle className="text-red-500 text-2xl cursor-pointer" /></Link>
          <Link href="#"><FaGithub className="text-gray-400 text-2xl cursor-pointer" /></Link>
          <Link href="#"><FaLinkedin className="text-blue-500 text-2xl cursor-pointer" /></Link>
          <Link href="#"><FaTwitter className="text-blue-400 text-2xl cursor-pointer" /></Link>
          <Link href="#"><FaFacebook className="text-blue-600 text-2xl cursor-pointer" /></Link>
        </div>
      </div>
    </div>
  )
}
