"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-amber-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <div 
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://raw.githubusercontent.com/Favor-star/week9_labs/refs/heads/develop/public/bg-image.png')"
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-end items-center bg-black/30 text-center p-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white pt-9 mb-2">
                    Welcome to Acme Co
                  </h1>
                  <p className="text-base sm:text-lg text-white mb-6 sm:mb-8">
                    Your friendly dashboard
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-full text-sm sm:text-base transition-colors">
                      Register
                    </Link>
                    <Link href="/login" className="bg-white hover:bg-gray-100 font-bold text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-colors">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

