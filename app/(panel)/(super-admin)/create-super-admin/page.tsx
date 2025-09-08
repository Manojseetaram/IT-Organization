"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { saveSuperAdmin, type SuperAdmin } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Mail, Lock, Shield, Building, Eye, EyeOff } from "lucide-react"

function CreateSuperAdminContent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    superadminId: "",
    orgId: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.superadminId) {
      newErrors.superadminId = "Super Admin ID is required"
    } else if (formData.superadminId.length < 3) {
      newErrors.superadminId = "Super Admin ID must be at least 3 characters"
    }

    if (!formData.orgId) {
      newErrors.orgId = "Organization ID is required"
    } else if (formData.orgId.length < 3) {
      newErrors.orgId = "Organization ID must be at least 3 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newSuperAdmin: SuperAdmin = {
        id: Date.now().toString(),
        email: formData.email,
        superadminId: formData.superadminId,
        orgId: formData.orgId,
        createdAt: new Date().toISOString(),
      }

      saveSuperAdmin(newSuperAdmin)

      toast({
        title: "Success!",
        description: "Super admin created successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create super admin. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Super Admin</h1>
            <p className="text-muted-foreground">Add a new super administrator to the system</p>
          </div>
        </div>

        {/* Form */}
        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Super Admin Details</CardTitle>
            <CardDescription>Fill in the information below to create a new super administrator account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="superadminId">Super Admin ID</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="superadminId"
                      type="text"
                      placeholder="SA001"
                      value={formData.superadminId}
                      onChange={(e) => handleInputChange("superadminId", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.superadminId && <p className="text-sm text-destructive">{errors.superadminId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgId">Organization ID</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orgId"
                      type="text"
                      placeholder="ORG001"
                      value={formData.orgId}
                      onChange={(e) => handleInputChange("orgId", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.orgId && <p className="text-sm text-destructive">{errors.orgId}</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Creating Super Admin...
                    </>
                  ) : (
                    "Create Super Admin"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Super Admin ID should be unique and follow your organization's naming convention</p>
            <p>• Organization ID links the super admin to their respective organization</p>
            <p>• Password should be strong and meet security requirements</p>
            <p>• All fields are required and will be validated before creation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CreateSuperAdminPage() {
  return (
    <AuthGuard>
      <CreateSuperAdminContent />
    </AuthGuard>
  )
}
