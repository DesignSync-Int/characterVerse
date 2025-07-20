'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function UpdateImagesPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [results, setResults] = useState<{
    success: boolean
    stats?: { updated: number; failed: number; skipped: number }
    error?: string
  } | null>(null)

  const updateImages = async () => {
    setIsUpdating(true)
    setResults(null)
    
    try {
      const response = await fetch('/api/update-images', {
        method: 'POST'
      })
      
      const data = await response.json()
      setResults(data)
    } catch {
      setResults({
        success: false,
        error: 'Failed to connect to update service'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Update Character Images
          </h1>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              This tool will search for real, legal character images from:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>TMDB (The Movie Database)</strong> - Official movie/TV show images</li>
              <li><strong>Wikimedia Commons</strong> - Public domain character images</li>
              <li><strong>High-quality avatars</strong> - As fallback for any character</li>
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">🔑 Setup Required</h3>
              <p className="text-blue-800 text-sm">
                For best results, add your free TMDB API key to your .env file:
              </p>
              <code className="block bg-blue-100 p-2 rounded mt-2 text-sm">
                TMDB_API_KEY=your_api_key_here
              </code>
              <p className="text-blue-700 text-sm mt-2">
                Get one free at: <a href="https://www.themoviedb.org/settings/api" className="underline" target="_blank" rel="noopener noreferrer">
                  themoviedb.org/settings/api
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={updateImages}
            disabled={isUpdating}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
              isUpdating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Updating Character Images...
              </div>
            ) : (
              '🖼️ Update All Character Images'
            )}
          </button>

          {results && (
            <div className={`mt-6 p-6 rounded-lg ${
              results.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {results.success ? (
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">✅ Update Complete!</h3>
                  {results.stats && (
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded">
                        <div className="text-2xl font-bold text-green-600">
                          {results.stats.updated}
                        </div>
                        <div className="text-sm text-green-700">Updated</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <div className="text-2xl font-bold text-yellow-600">
                          {results.stats.skipped}
                        </div>
                        <div className="text-sm text-yellow-700">Skipped</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <div className="text-2xl font-bold text-red-600">
                          {results.stats.failed}
                        </div>
                        <div className="text-sm text-red-700">Failed</div>
                      </div>
                    </div>
                  )}
                  <p className="text-green-800 mt-4">
                    Go back to the <Link href="/characters" className="underline font-semibold">characters page</Link> to see the updated images!
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">❌ Update Failed</h3>
                  <p className="text-red-800">{results.error}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Legal & Attribution</h3>
            <p className="text-gray-600 text-sm">
              All images are sourced legally with proper attribution. TMDB images are used under fair use, 
              Wikimedia images are Creative Commons or public domain. The app respects all copyright and 
              licensing requirements.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
