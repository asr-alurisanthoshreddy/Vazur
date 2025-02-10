// contact/page.tsx
"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:support@mlbfanfeed.com?subject=Contact%20Query&body=Name:%20${formData.name}%0AEmail:%20${formData.email}%0APhone:%20${formData.phone}%0AQuery:%20${formData.query}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="mt-2 text-center text-gray-400">We're here to help. Send us your query!</p>
        
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="query"
            placeholder="Your Query"
            value={formData.query}
            onChange={handleChange}
            className="px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-bold shadow-lg hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
