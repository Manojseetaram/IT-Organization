"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, RefreshCw } from "lucide-react"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (otpValue === "123456") {
        toast({
          title: "OTP verified!",
          description: "Your OTP has been successfully verified.",
        })
        router.push("/new-password")
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        })
      }
      setLoading(false)
    }, 2000)
  }

  const handleResend = async () => {
    setResendLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResendLoading(false)
      setTimeLeft(60)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
      toast({
        title: "OTP resent!",
        description: "A new OTP has been sent to your email address.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Enter verification code</CardTitle>
          <CardDescription>We've sent a 6-digit code to your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
               <Input
  key={index}
  ref={(el) => {
    inputRefs.current[index] = el
  }}
  type="text"
  inputMode="numeric"
  maxLength={1}
  value={digit}
  onChange={(e) => handleChange(index, e.target.value)}
  onKeyDown={(e) => handleKeyDown(index, e)}
  className="w-12 h-12 text-center text-lg font-semibold"
/>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify code"
              )}
            </Button>

            <div className="text-center space-y-2">
              {timeLeft > 0 ? (
                <p className="text-sm text-muted-foreground">Resend code in {timeLeft}s</p>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-sm"
                >
                  {resendLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend code
                    </>
                  )}
                </Button>
              )}
            </div>

            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Demo OTP: <strong>123456</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
