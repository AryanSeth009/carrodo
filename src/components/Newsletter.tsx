"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/sendNewsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
    setEmail("");
  };

  return (
    <div className="max-w-7xl flex flex-row items-center mx-auto px-6 lg:px-12">
      <div className="flex flex-col flex-1">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[4rem] lg:text-[5.2rem] leading-tight font-serif"
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
          className="max-w-md space-y-6"
        >
          <form onSubmit={handleSubscribe} className="flex gap-4">
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
              className="h-12 px-8 flex items-center text-center bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] hover:bg-[#B39142] border border-white text-black font-medium rounded-full"
            >
              {loading ? "Subscribing..." : "Notify Me"}
            </button>
          </form>
          {message && <p className="text-sm text-gray-400">{message}</p>}
          <p className="text-sm text-gray-400">*Don't worry we will not spam you :)</p>
        </motion.div>
      </div>
      <div className="flex-1 flex justify-end">
        <motion.img
          className="max-h-[700px] w-auto object-contain"
          src="/Bg_mockup.png"
          alt="Mockup"
          animate={{
            y: [0, -20, 0], // Moves up and down
          }}
          transition={{
            duration: 3, // Smooth transition time
            repeat: Infinity, // Infinite loop
            ease: "easeInOut", // Smooth easing
          }}
        />
      </div>
    </div>

  );
}
