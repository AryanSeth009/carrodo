"use client"

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../login/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUpWithPhone, signUpWithEmail, signInWithGoogle, loading } = useAuth();

  const handlePhoneSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!phone) {
      toast({ title: "Error", description: "Enter your phone number", variant: "destructive" });
      return;
    }
    await signUpWithPhone(`+91${phone}`);
  };

  const handleEmailSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await signUpWithEmail(email, password);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url("/darkcar2.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md backdrop-blur-md border border-[#555555] p-8 rounded-2xl">
      <div className="flex items-center justify-center gap-2 mb-8">
          <img src="./Logo.png" className="h-[44px] w-[149px]" alt="Logo" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Create an Account</h1>
        <p className="text-gray-400 mb-6">Sign up to get started</p>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="space-y-2 text-white">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" className="h-12 text-[#555555] bg-gray-800/50 border-[#555555] rounded-[15px] " value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>

          <div className="space-y-2 text-white">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-12 bg-gray-800/50 border-[#555555] rounded-[15px] text-[#555555] pr-10" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
              <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300" onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#A47A1EE6] to-[#956D13E6] rounded-[15px]" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
          Already have an account?
          <Link href="/login" className="text-transparent ml-1  bg-gradient-to-r from-[#A47A1EE6] via-[#D3A84CE6] via-[#E6BE69E6] via-[#FFD87CE6] via-[#B58F3EE6] to-[#956D13E6] bg-clip-text hover:text-[#555555]">Log in</Link>
        </div>
      </div>
    </div>
  );
}
