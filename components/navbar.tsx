'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { LogOut, User, Shield } from 'lucide-react'
import { useState } from 'react'
import { Menu } from 'lucide-react'
export function Navbar() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <nav className="py-4 px-10 mx-7 md:px-10 flex justify-between items-center  bg-white">
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
          <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors">
            Register
          </Link>
          <Link href="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
            Login
          </Link>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-white shadow-lg p-4 md:hidden z-50">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 py-2">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 py-2">Contact</Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors text-center">
                Register
              </Link>
              <Link href="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors text-center">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
  )
}


