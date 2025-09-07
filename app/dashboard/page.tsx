"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { getUser, getSuperAdmins, removeUser, type User, type SuperAdmin } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Users, UserPlus, LogOut, Shield, Building } from "lucide-react"

function DashboardContent() {
  const [user, setUser] = useState<User | null>(null)
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
    setSuperAdmins(getSuperAdmins())
  }, [])

  const handleLogout = () => {
    removeUser()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleCreateSuperAdmin = () => {
    router.push("/create-super-admin")
  }

  const handleViewSuperAdmins = () => {
    router.push("/view-super-admins")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Super Admins</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{superAdmins.length}</div>
            <p className="text-xs text-muted-foreground">Active super administrators</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(superAdmins.map((admin) => admin.orgId)).size}</div>
            <p className="text-xs text-muted-foreground">Unique organizations</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                superAdmins.filter((admin) => {
                  const createdDate = new Date(admin.createdAt)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return createdDate > weekAgo
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Added this week</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {user?.role?.toUpperCase()}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Admin</div>
            <p className="text-xs text-muted-foreground">System administrator</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cursor-pointer transition-all hover:shadow-md" onClick={handleCreateSuperAdmin}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Create Super Admin</CardTitle>
                <CardDescription>Add a new super administrator to the system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create new super admin accounts with organization access and administrative privileges.
            </p>
            <Button className="mt-4 w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Create New Super Admin
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md" onClick={handleViewSuperAdmins}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-input">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>View Super Admins</CardTitle>
                <CardDescription>Manage existing super administrator accounts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View, edit, and manage all super administrator accounts in the system.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              <Users className="mr-2 h-4 w-4" />
              View All Super Admins
            </Button>
          </CardContent>
        </Card>
        
      </div>

      {/* Recent Activity */}
      {superAdmins.length > 0 && (
        <Card className="cursor-pointer transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Super Admins</CardTitle>
            <CardDescription>Latest super administrator accounts created</CardDescription>
          </CardHeader>
          <CardContent >
            <div className="space-y-4">
              {superAdmins
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
                .map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{admin.email}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {admin.superadminId} • Org: {admin.orgId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{new Date(admin.createdAt).toLocaleDateString()}</p>
                      <Badge variant="outline" className="text-xs text-white bg-primary border-none">
                        Super Admin
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
