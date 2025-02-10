"use client"
import Link from "next/link";
import { FaGoogle, FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
        <p className="mt-2 text-center text-gray-400">Enter your credentials to continue.</p>

        <form className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-bold shadow-lg hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-gray-400 hover:text-gray-300 text-sm">
            Forgot Password?
          </Link>
        </div>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="#" className="text-red-500 text-2xl">
            <FaGoogle />
          </a>
          <a href="#" className="text-gray-400 text-2xl">
            <FaGithub />
          </a>
          <a href="#" className="text-blue-500 text-2xl">
            <FaLinkedin />
          </a>
          <a href="#" className="text-blue-400 text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-blue-600 text-2xl">
            <FaFacebook />
          </a>
        </div>
      </div>
    </div>
  );
}
