"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"

interface AuthDialogProps {
  mode: "login" | "signup"
  trigger: React.ReactNode
}

export function AuthDialog({ mode, trigger }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMode, setCurrentMode] = useState(mode)
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px]" style={{ borderRadius: "32px" }}>
        <div className="flex flex-col items-center space-y-2 mb-4">
          <p className="text-blue-300 text-2xl font-bold">MLB ⚾️</p>
          <p className="text-xl font-semibold text-center">
            Welcome to MLB FanFeed
          </p>
          {currentMode === "signup" && (
            <p className="text-center text-gray-600 -mt-2">
              Get AI-powered insights
            </p>
          )}
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="ml-[45px] text-sm">Email address</Label>
            <div className="flex justify-center">
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="rounded-2xl w-[260px] text-sm"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="ml-[45px] text-sm">Password</Label>
            <div className="flex justify-center">
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className="rounded-2xl w-[260px] text-sm"
              />
            </div>
          </div>
          {currentMode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="dob" className="ml-[45px] text-sm">Date of Birth</Label>
              <div className="flex justify-center">
                <Input 
                  id="dob" 
                  type="date" 
                  className="rounded-2xl w-[260px] text-sm"
                />
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-2 w-[260px]">
              {currentMode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] bg-gray-300 w-[100px]"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-[1px] bg-gray-300 w-[100px]"></div>
          </div>
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="rounded-full w-[260px] flex items-center gap-2"
              onClick={() => {/* Add Google sign in logic */}}
            >
              <Image
                src="/google-logo-9808.png"
                alt="Google"
                width={20}
                height={20}
                // className="absolute left-20"
              />
              Continue with Google
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 space-y-2 mt-4">
            <p>
              By continuing, you agree to MLB FanFeed's{' '}
              <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
              and acknowledge that you've read our{' '}
              <a href="/Privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
            {currentMode === "login" && (
              <p>
                Not on MLB FanFeed yet?{' '}
                <button 
                  onClick={() => setCurrentMode("signup")}
                  className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            )}
            {currentMode === "signup" && (
              <p>
                Already a member?{' '}
                <button 
                  onClick={() => setCurrentMode("login")}
                  className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 