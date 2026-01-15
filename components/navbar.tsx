'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { LogOut, User, Shield, Menu } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <nav className="py-4 px-10 mx-7 md:px-10 flex justify-between items-center bg-white">
        <Link href="/" className="font-bold text-xl">Acme Co</Link>
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden font-semibold md:flex items-center gap-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          {status === 'authenticated' ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      <div className="flex items-center space-x-1 pt-1">
                        {session.user.role === 'admin' ? (
                          <Shield className="h-3 w-3 text-purple-600" />
                        ) : (
                          <User className="h-3 w-3 text-blue-600" />
                        )}
                        <p className="text-xs font-medium capitalize text-muted-foreground">
                          {session.user.role}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors">
                Register
              </Link>
              <Link href="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
                Login
              </Link>
            </>
          )}
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-white shadow-lg p-4 md:hidden z-50">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 py-2">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 py-2">Contact</Link>
              {status === 'authenticated' ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session?.user?.image || ''} />
                      <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{session.user.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-gray-600 hover:text-gray-900 justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors text-center">
                    Register
                  </Link>
                  <Link href="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors text-center">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
  )
}




