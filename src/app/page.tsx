"use client"

import { useScroll, motion, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Clock, MapPin } from "lucide-react"

export default function Page() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  // Transform values for floating cards
  const card1Y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"])
  const card2Y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"])
  const card3Y = useTransform(scrollYProgress, [0, 1], ["150%", "-150%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <a href="/">
              <img className="h-[44px] w-[149px]" src="/Logo.png" alt="" />
            </a>
          </div>
          <nav className="flex items-center gap-12">
            <div className="gap-6 flex">
              <Button
                variant="outline"
                className="border border-[#fff] h-[31px] w-[90px] text-[#fff] rounded-full px-6 py-2 text-[15px] 
                         hover:bg-[#C4A052] hover:text-black transition-all duration-300"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="border border-[#fff] h-[31px] w-[100px] text-[#fff] bg-gradient-to-r from-[#A47A1E80] via-[#D3A84C80] via-31% via-[#E6BE6980] via-50% via-[#FFD87C80] via-66% via-[#B58F3E80] via-82% to-[#956D1380] rounded-full px-6 py-2 text-[15px] 
                         hover:bg-[#C4A052] hover:text-black transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/darkcar.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h1 className="text-7xl font-serif tracking-wide leading-tight">
                Elevate Your Lifestyle with
                <span className="block text-[#C4A052] mt-4 tracking-normal">Carrodo Premium</span>
              </h1>
              <p className="text-[17px] text-gray-300 font-light">Premium car rentals at your fingertips.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Parallax Section */}
      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#C4A052]/10 via-black to-black"
      >
        {/* Floating Cards */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: card1Y, scale, x: "10%" }} className="absolute top-1/4 right-[15%] w-[300px]">
            <div className="bg-black/80 backdrop-blur-lg rounded-xl p-6 border border-[#C4A052]/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C4A052]/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#C4A052]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Premium Experience</h3>
                  <p className="text-sm text-gray-400">Luxury at its finest</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Concierge Service</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: card2Y, scale, x: "-20%" }} className="absolute top-1/3 left-[10%] w-[280px]">
            <div className="bg-[#C4A052]/10 backdrop-blur-lg rounded-xl p-6 border border-[#C4A052]/30">
              <img
                src="/placeholder.svg?height=150&width=250"
                alt="Luxury Car"
                className="w-full h-[150px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">Latest Models</h3>
              <p className="text-sm text-gray-400">Updated fleet of premium vehicles</p>
            </div>
          </motion.div>

          <motion.div style={{ y: card3Y, scale, x: "30%" }} className="absolute top-1/2 right-[10%] w-[320px]">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-[#C4A052]/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Global Locations</h3>
                  <p className="text-sm text-gray-400">Available worldwide</p>
                </div>
                <MapPin className="w-6 h-6 text-[#C4A052]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#C4A052]/20 border border-[#C4A052]/30" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">50+ locations</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div style={{ y, opacity }} className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-serif"
            >
              Get Notified
              <span className="block text-[#C4A052] mt-4">When We Launch</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md mx-auto space-y-6"
            >
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 bg-white/10 border-[#C4A052]/30 text-white placeholder:text-gray-400 rounded-full"
                />
                <Button className="h-12 px-8 !p-6 !w-[150px] !bg-[#C4A052] hover:bg-[#B39142] text-black font-medium rounded-full">
                  Notify Me
                </Button>
              </div>
              <p className="text-sm text-gray-400">*Don&apos;t worry we will not spam you :)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              {[
                { number: "24/7", label: "Customer Support" },
                { number: "100+", label: "Luxury Vehicles" },
                { number: "50+", label: "Locations" },
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#C4A052]/20">
                  <div className="text-4xl font-bold text-[#C4A052]">{stat.number}</div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,160,82,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black_90%)]" />
      </section>
    </div>
  )
}

