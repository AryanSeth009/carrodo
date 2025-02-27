"use client"

import { useScroll, motion, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Star, Clock, MapPin } from "lucide-react"
import BookingForm from "@/components/BookingForm"

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
            <header className="absolute top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <a href="/">
                            <img className="h-[44px] w-[149px]" src="/Logo.png" alt="" />
                        </a>
                    </div>
                    <nav className="flex items-center gap-12">
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
                                About us
                            </Link>
                            <Link href="/fleet" className="text-white hover:text-gray-200 transition-colors">
                                Fleet
                            </Link>
                            <Link href="/services" className="text-white hover:text-gray-200 transition-colors">
                                Services
                            </Link>
                            <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
                                Contact us
                            </Link>
                        </div>

                        <Button
                            style={{
                                border: "1.5px solid transparent", // Keep space for the gradient
                                borderRadius: "20px", // Rounded border
                                background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%) border-box",
                            }}
                            className="text-white gap-1 hover:bg-[#fff]  !rounded-full px-6"
                        >
                            <span className="gap-2" style={{
                            }} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(255,216,124,1)"><path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path></svg></span> Download App
                        </Button>

                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative min-h-screen flex items-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: ' url("/HeroSectionBg.png")',
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
                            <p className="text-[17px] text-gray-300 font-light">Vehicle rentals at your fingertips.</p>
                            <BookingForm/>
                        </div>
                    </div>
                </div>
            </main>

            {/* Enhanced Parallax Section */}

        </div>
    )
}

