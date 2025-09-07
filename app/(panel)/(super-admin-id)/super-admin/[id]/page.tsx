"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getSuperAdmins, type SuperAdmin } from "@/lib/auth"
import { ArrowLeft, Shield, Building, Mail, Calendar, Settings, Users, BarChart3 } from "lucide-react"

function SuperAdminDetailsContent() {
  const [superAdmin, setSuperAdmin] = useState<SuperAdmin | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const adminId = params.id as string
    const admins = getSuperAdmins()
    const admin = admins.find((a) => a.id === adminId)

    if (!admin) {
      router.push("/view-super-admins")
      return
    }

    setSuperAdmin(admin)
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p>Loading super admin details...</p>
        </div>
      </div>
    )
  }

  if (!superAdmin) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/view-super-admins">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Super Admin Details</h1>
                <p className="text-muted-foreground">Manage and view super administrator information</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Super Administrator
            </Badge>
          </div>

          {/* Admin Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{superAdmin.email}</CardTitle>
                  <CardDescription>Super Administrator • ID: {superAdmin.superadminId}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email Address</span>
                  </div>
                  <p className="font-medium">{superAdmin.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Super Admin ID</span>
                  </div>
                  <p className="font-medium">{superAdmin.superadminId}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>Organization ID</span>
                  </div>
                  <p className="font-medium">{superAdmin.orgId}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created Date</span>
                  </div>
                  <p className="font-medium">{new Date(superAdmin.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Settings</CardTitle>
                    <CardDescription>Manage admin settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Users</CardTitle>
                    <CardDescription>Manage organization users</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Analytics</CardTitle>
                    <CardDescription>View admin analytics</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest activities and changes for this super administrator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Super admin account created</p>
                    <p className="text-sm text-muted-foreground">Account was successfully created and activated</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(superAdmin.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg opacity-60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Initial setup completed</p>
                    <p className="text-sm text-muted-foreground">Basic configuration and permissions set up</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(superAdmin.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default function SuperAdminDetailsPage() {
  return (
    <AuthGuard>
      <SuperAdminDetailsContent />
    </AuthGuard>
  )
}
