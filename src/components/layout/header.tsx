'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Search, User, Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/characters" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="text-xl font-bold text-slate-900">
              CharacterVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/characters"
              className="text-purple-600 hover:text-purple-700 transition-colors font-semibold"
            >
              Characters
            </Link>
            <Link
              href="/universes"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Universes
            </Link>
            <Link
              href="/rankings"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Rankings
            </Link>
            <Link
              href="/lists"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Lists
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signOut()}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign Out
                </button>
                <div className="flex items-center space-x-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-900">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => signIn()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/characters"
                className="text-slate-600 hover:text-slate-900"
              >
                Characters
              </Link>
              <Link
                href="/universes"
                className="text-slate-600 hover:text-slate-900"
              >
                Universes
              </Link>
              <Link
                href="/rankings"
                className="text-slate-600 hover:text-slate-900"
              >
                Rankings
              </Link>
              <Link
                href="/lists"
                className="text-slate-600 hover:text-slate-900"
              >
                Lists
              </Link>
              <div className="pt-4 border-t border-slate-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search characters..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
