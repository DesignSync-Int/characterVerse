'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SignIn() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">CV</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Join CharacterVerse
            </h2>
            <p className="text-slate-600">
              Sign in to rate characters and join our community
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <div className="space-y-4">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                  >
                    {provider.name === 'Google' && '🔍'}
                    {provider.name === 'GitHub' && '🐙'}
                    {provider.name === 'Credentials' && '📧'}
                    <span className="ml-2">Continue with {provider.name}</span>
                  </button>
                ))}

              {!providers && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-slate-500 mt-2">Loading sign-in options...</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Back to CharacterVerse
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
