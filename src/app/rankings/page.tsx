import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Trophy, TrendingUp } from 'lucide-react'

export default async function RankingsPage() {
  // Get top-rated characters
  const topCharacters = await prisma.character.findMany({
    include: {
      universe: true,
      _count: {
        select: {
          ratings: true,
          reviews: true
        }
      }
    },
    orderBy: {
      overallRating: 'desc'
    },
    take: 20
  })

  // Get most rated characters
  const mostRatedCharacters = await prisma.character.findMany({
    include: {
      universe: true,
      _count: {
        select: {
          ratings: true,
          reviews: true
        }
      }
    },
    orderBy: {
      totalRatings: 'desc'
    },
    take: 10
  })

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Comic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 halftone-bg opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="comic-title text-6xl text-yellow-400 mb-6">
              HERO RANKINGS
            </h1>
            <div className="speech-bubble max-w-2xl mx-auto">
              <p className="text-black font-bold">
                🏆 Discover the highest-rated and most popular heroes across all universes! 🏆
              </p>
            </div>
          </div>

          {/* Top Rated Characters */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Trophy className="h-8 w-8 text-yellow-400 mr-4" />
              <h2 className="comic-title text-4xl text-yellow-400">
                TOP RATED HEROES
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topCharacters.map((character, index) => (
                <Link
                  key={character.id}
                  href={`/characters/${character.slug}`}
                  className="comic-card hover:scale-105 transition-all duration-200 overflow-hidden group relative"
                >
                  {/* Ranking badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-black z-10">
                    <span className="comic-title text-black font-bold">#{index + 1}</span>
                  </div>
                  
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center halftone-bg">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-black">
                          <span className="text-3xl">🦸</span>
                        </div>
                        <span className="comic-title text-white text-lg">{character.name}</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute top-4 right-4">
                      <div className="comic-button px-3 py-2 text-sm font-bold bg-green-400 text-black">
                        ⭐ {character.overallRating.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800">
                    <h3 className="comic-title text-xl text-yellow-400 mb-2">
                      {character.name}
                    </h3>
                    <p className="text-blue-300 text-sm mb-2">{character.universe.name}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white">{character._count.ratings} votes</span>
                      <span className="text-white">{character._count.reviews} reviews</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Most Popular Characters */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-8 w-8 text-yellow-400 mr-4" />
              <h2 className="comic-title text-4xl text-yellow-400">
                MOST POPULAR
              </h2>
            </div>
            
            <div className="space-y-4">
              {mostRatedCharacters.map((character, index) => (
                <Link
                  key={character.id}
                  href={`/characters/${character.slug}`}
                  className="comic-card p-6 hover:scale-105 transition-all duration-200 flex items-center space-x-6 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full border-2 border-black">
                    <span className="comic-title text-black font-bold">#{index + 1}</span>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-black">
                    <span className="text-2xl">🦸</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="comic-title text-2xl text-yellow-400 mb-1">
                      {character.name}
                    </h3>
                    <p className="text-blue-300">{character.universe.name}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="comic-button px-4 py-2 bg-green-400 text-black mb-2">
                      ⭐ {character.overallRating.toFixed(1)}
                    </div>
                    <p className="text-white text-sm">{character._count.ratings} votes</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href="/characters"
              className="comic-button px-8 py-4 text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
            >
              🚀 EXPLORE ALL HEROES 🚀
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
