"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { getSuperAdmins, type SuperAdmin } from "@/lib/auth"
import { ArrowLeft, Search, Shield, Building, Calendar, Eye } from "lucide-react"

function ViewSuperAdminsContent() {
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAdmins, setFilteredAdmins] = useState<SuperAdmin[]>([])
  const router = useRouter()

  useEffect(() => {
    const admins = getSuperAdmins()
    setSuperAdmins(admins)
    setFilteredAdmins(admins)
  }, [])

  useEffect(() => {
    const filtered = superAdmins.filter(
      (admin) =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.superadminId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.orgId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredAdmins(filtered)
  }, [searchTerm, superAdmins])

  const handleViewDetails = (adminId: string) => {
    router.push(`/super-admin/${adminId}`)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl space-y-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Super Administrators</h1>
              <p className="text-muted-foreground">Manage and view all super administrator accounts</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/create-super-admin">Create New</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Super Admins</CardTitle>
              <Shield className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{superAdmins.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Building className="hh-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(superAdmins.map((admin) => admin.orgId)).size}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
              <Search className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAdmins.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search Super Admins</CardTitle>
            <CardDescription>Search by email, super admin ID, or organization ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search super admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Super Admins List */}
        <div className="space-y-4">
          {filteredAdmins.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {superAdmins.length === 0 ? "No Super Admins Found" : "No Results Found"}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {superAdmins.length === 0
                    ? "Get started by creating your first super administrator account."
                    : "Try adjusting your search terms or clear the search to see all super admins."}
                </p>
                {superAdmins.length === 0 && (
                  <Button asChild>
                    <Link href="/create-super-admin">Create First Super Admin</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredAdmins.map((admin) => (
                <Card key={admin.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{admin.email}</h3>
                            <Badge variant="secondary">Super Admin</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Shield className="h-3 w-3" />
                              <span>ID: {admin.superadminId}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>Org: {admin.orgId}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Created: {new Date(admin.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => handleViewDetails(admin.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ViewSuperAdminsPage() {
  return (
    <AuthGuard>
      <ViewSuperAdminsContent />
    </AuthGuard>
  )
}
