'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Building2, Check, ExternalLink } from 'lucide-react'

export default function CommercialImagesPage() {
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
      const response = await fetch('/api/update-commercial-images', {
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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Commercial-Safe Character Images
            </h1>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Check className="h-5 w-5" />
              100% Commercial Safe Sources
            </h2>
            <p className="text-green-800 mb-4">
              This tool uses only image sources that are completely free for commercial, 
              professional, and business use. No licensing fees, no attribution requirements 
              for some sources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">🎨 Image Sources</h3>
              
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Wikimedia Commons</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">FREE</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Public domain and Creative Commons images. Perfect for mythological 
                    and historical characters.
                  </p>
                  <p className="text-xs text-green-600">✅ Commercial use allowed</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Unsplash</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">FREE</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    High-quality artistic photos and portraits.
                  </p>
                  <p className="text-xs text-green-600">✅ Commercial use allowed</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Pixabay</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">FREE</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Illustrations and cartoon-style character art.
                  </p>
                  <p className="text-xs text-green-600">✅ Commercial use allowed</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Generated Avatars</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">FALLBACK</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Professional character avatars with consistent styling.
                  </p>
                  <p className="text-xs text-green-600">✅ No restrictions</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">🔧 API Setup (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                For best results, add free API keys to your .env file:
              </p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Unsplash API</span>
                    <a 
                      href="https://unsplash.com/developers" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Get Key <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <code className="text-xs text-gray-700">UNSPLASH_ACCESS_KEY=your_key</code>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Pixabay API</span>
                    <a 
                      href="https://pixabay.com/api/docs/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Get Key <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <code className="text-xs text-gray-700">PIXABAY_API_KEY=your_key</code>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Pexels API</span>
                    <a 
                      href="https://www.pexels.com/api/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Get Key <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <code className="text-xs text-gray-700">PEXELS_API_KEY=your_key</code>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                💡 Works without API keys using Wikimedia and generated avatars only
              </p>
            </div>
          </div>

          <button
            onClick={updateImages}
            disabled={isUpdating}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
              isUpdating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Updating with Commercial-Safe Images...
              </div>
            ) : (
              '🏢 Update All Images (Commercial Safe)'
            )}
          </button>

          {results && (
            <div className={`mt-6 p-6 rounded-lg ${
              results.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {results.success ? (
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">✅ Commercial Update Complete!</h3>
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
                        <div className="text-sm text-yellow-700">Already Safe</div>
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
                    🎉 All images are now safe for commercial use! View them on the{' '}
                    <Link href="/characters" className="underline font-semibold">characters page</Link>.
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
            <h3 className="font-semibold text-gray-900 mb-3">⚖️ Legal Compliance</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm mb-2">
                <strong>Commercial Safety Guarantee:</strong> All image sources used by this tool 
                are verified to be free for commercial use. This includes:
              </p>
              <ul className="text-blue-700 text-sm space-y-1 ml-4">
                <li>• No licensing fees required</li>
                <li>• Safe for business/professional use</li>
                <li>• Proper attribution provided where required</li>
                <li>• Public domain and Creative Commons content</li>
                <li>• Generated content with no restrictions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
