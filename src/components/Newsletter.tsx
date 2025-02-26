"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/sendNewsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setMessage(data.message)
    setLoading(false)
    setEmail("")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-0">
      {/* Change to column layout on mobile */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-0">
        <div className="flex flex-col flex-1 w-full lg:w-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[2.5rem] sm:text-[3.5rem] lg:text-[5.2rem] leading-tight font-serif text-center lg:text-left"
          >
            Get Notified
            <span className="block text-transparent bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] bg-clip-text mt-0">
              When We Launch
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto lg:mx-0 space-y-6 w-full"
          >
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/10 border-[#C4A052]/30 text-white placeholder:text-gray-400 rounded-full px-4 w-full"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-8 flex items-center justify-center text-center bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] hover:bg-[#B39142] border border-white text-black font-medium rounded-full whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Notify Me"}
              </button>
            </form>
            {message && <p className="text-sm text-gray-400 text-center lg:text-left">{message}</p>}
            <p className="text-sm text-gray-400 text-center lg:text-left">*Don't worry we will not spam you :)</p>
          </motion.div>
        </div>

        {/* Image container */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
          <motion.img
            className="max-h-[300px] sm:max-h-[400px] lg:max-h-[700px] w-auto object-contain"
            src="/Bg_mockup.png"
            alt="Mockup"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  )
}

