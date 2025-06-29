'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Shield, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

    // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }
  if (!session) {
    return null
  }

  const isAdmin = session.user.role === 'admin'

  return (
    <div className="container mx-auto lg:px-20 px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Hello {session.user.name}, here's what's happening with your account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">
              Your account is fully verified and active
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role</CardTitle>
            {isAdmin ? (
              <Shield className="h-4 w-4 text-purple-600" />
            ) : (
              <User className="h-4 w-4 text-blue-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize mb-1">
              {session.user.role}
            </div>
            <Badge variant={isAdmin ? "default" : "secondary"} className={isAdmin ? "bg-purple-600" : "bg-blue-600"}>
              {isAdmin ? 'Administrator' : 'Regular User'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Name</div>
              <div className="text-lg">{session.user.name || 'Not provided'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Email</div>
              <div className="text-lg">{session.user.email}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Role</div>
              <Badge variant={isAdmin ? "default" : "secondary"} className={isAdmin ? "bg-purple-600" : "bg-blue-600"}>
                {session.user.role}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access your most used features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
              <Button variant="outline" className="justify-start">
                <Activity className="mr-2 h-4 w-4" />
                View Activity
              </Button>
              {isAdmin && (
                <Button asChild className="justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <Card className="mt-6 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Shield className="h-5 w-5" />
              <span>Administrator Access</span>
            </CardTitle>
            <CardDescription>
              You have administrator privileges. Access advanced features and user management.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link href="/admin">
                Go to Admin Panel
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
