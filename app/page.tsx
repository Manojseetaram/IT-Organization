"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
