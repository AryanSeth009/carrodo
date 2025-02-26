"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

import NewsletterSection from "@/components/Newsletter";
import Router from "next/router";

export default function Page() {


  const handleLogin = () => {
    // Implement your login logic here
      window.location.href = ('/login');
    // You can add your authentication logic, e.g., calling an API
  };
  const handleSignup = () => {
    // Implement your login logic here
      window.location.href = ('/signup');
    // You can add your authentication logic, e.g., calling an API
  };
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Transform values for floating cards
  const card1Y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const card2Y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const card3Y = useTransform(scrollYProgress, [0, 1], ["150%", "-150%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);


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
            <div className="gap-6 flex">
              <Button onClick={handleLogin}
                variant="outline"
                className="border border-[#fff] h-[31px] w-[90px] text-[#fff] !rounded-full px-6 py-2 text-[15px] 
                         hover:bg-[#C4A052] hover:text-black transition-all duration-300"
              >
                Login
              </Button>
              <Button
              onClick={handleSignup}
                variant="outline"
                style={{
                  background: `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), 
                  linear-gradient(90deg, rgba(164, 122, 30, 0.5) 0%, rgba(211, 168, 76, 0.5) 16%, 
                  rgba(211, 168, 76, 0.5) 31.5%, rgba(230, 190, 105, 0.5) 50%, 
                  rgba(255, 216, 124, 0.5) 66.5%, rgba(181, 143, 62, 0.5) 82.5%, 
                  rgba(149, 109, 19, 0.5) 100%)`
                }}
                className="border border-[#fff] h-[31px] w-[100px] text-[#fff]  via-[#FFD87C80] via-66% via-[#B58F3E80] via-82% to-[#956D1380] !rounded-full px-6 py-2 text-[15px] 
                         hover:bg-[#C4A052] hover:text-black transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Parallax Section */}
      <section ref={containerRef} className=" min-h-screen overflow-hidden ">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/preview.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Floating Cards */}

        <motion.div
          style={{ y, opacity }}
          className="container !pt-48 mx-auto px-4 py-32 relative z-10"
        >
          <NewsletterSection />
        </motion.div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,160,82,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black_90%)]" />
      </section>
    </div>
  );
}
