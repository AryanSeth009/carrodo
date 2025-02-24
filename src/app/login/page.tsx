"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signInWithPhone, verifyOTP, signInWithEmail, signInWithGoogle, loading, error } = useAuth()

  

  const handlePhoneSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!phone) {
      toast({ title: "Error", description: "Enter your phone number", variant: "destructive" })
      return
    }
    await signInWithPhone(`+91${phone}`)
    setShowOtpInput(true)
  }

  const handleOtpSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!otp) {
      toast({ title: "Error", description: "Enter OTP", variant: "destructive" })
      return
    }
    await verifyOTP(`+91${phone}`, otp)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithEmail(email, password)
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url("/darkcar2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-md border border-[#555555] p-8 rounded-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="./Logo.png" className="h-[44px] w-[149px]" alt="Logo" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-6">Please enter your details to sign in</p>

        <Tabs defaultValue="phone" className="space-y-6" >


          <TabsContent value="phone" className="space-y-4">
            <form onSubmit={showOtpInput ? handleOtpSubmit : handlePhoneSubmit} className="space-y-4">
              {!showOtpInput ? (
                <div className="space-y-2 text-white">
                  <Label htmlFor="phone  !text-white">Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 h-12 px-3 py-2 bg-gray-800/50 border border-[#555555] text-white rounded-[15px]">
                      <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="w-5" />
                      <span>+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="flex-1 h-12 bg-gray-800/50 border-[#555555] rounded-[15px] text-[#555555] placeholder-[#555555]"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-white">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    className="h-12 bg-gray-800/50 border-[#555555] text-[#555555] rounded-[15px] placeholder-[#555555]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12  bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] rounded-[15px]  "
                style={{
                  background: `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
                                 linear-gradient(90deg, #A47A1E 0%, #D3A84C 16%, #D3A84C 31.5%, 
                                 #E6BE69 50%, #FFD87C 66.5%, #B58F3E 82.5%, #956D13 100%)`,
                }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {showOtpInput ? "Verifying..." : "Sending OTP..."}
                  </div>
                ) : (
                  <span>{showOtpInput ? "Verify OTP" : "Continue"}</span>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* <TabsContent value="email" className="space-y-4">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-gray-800/50 border-[#555555] text-white placeholder-[#555555]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 bg-gray-800/50 border-[#555555] text-white placeholder-[#555555] pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="border-[#555555] bg-gray-800/50 text-[#555555]" />
                  <Label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-transparent bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] bg-clip-text"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] text-black"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </TabsContent> */}
        </Tabs>

        <div className="mt-6 relative flex items-center">
          <div className="flex-1 border-t border-[#555555]"></div>
          <span className="px-4 text-gray-400 uppercase text-lg">OR</span>
          <div className="flex-1 border-t border-[#555555]"></div>
        </div>


        <Button
          type="button"
          variant="outline"
          className="w-full mt-6 h-12 bg-white rounded-[15px] text-black hover:bg-gray-100"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          Login with Google
        </Button>

        <div className="text-center text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"

            className="text-transparent bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] bg-clip-text hover:text-[#555555]"
          >
            Sign up
          </Link>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  )
}
