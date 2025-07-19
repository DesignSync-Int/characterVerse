import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Users } from 'lucide-react'

export default async function UniversesPage() {
  const universes = await prisma.universe.findMany({
    include: {
      _count: {
        select: {
          characters: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  const getUniverseIcon = (type: string) => {
    switch (type) {
      case 'COMICS': return '📚'
      case 'ANIME': return '🎌'
      case 'MOVIES': return '🎬'
      case 'TV_SHOWS': return '📺'
      case 'GAMES': return '🎮'
      case 'MYTHOLOGY': return '⚡'
      case 'BOOKS': return '📖'
      default: return '🌟'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore Universes</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover characters from your favorite fictional universes across comics, anime, movies, games, and more.
          </p>
        </div>

        {/* Universes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universes.map((universe) => (
            <Link
              key={universe.id}
              href={`/universes/${universe.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-slate-200"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-blue-100 relative">
                {universe.imageUrl ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${universe.imageUrl})` }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{getUniverseIcon(universe.type)}</span>
                  </div>
                )}
                
                {/* Universe Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs rounded-full font-medium">
                    {universe.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {universe.name}
                </h3>
                
                {universe.description && (
                  <p className="text-slate-600 mb-4 line-clamp-2">{universe.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-slate-500">
                    <Users className="h-4 w-4 mr-1" />
                    {universe._count.characters} character{universe._count.characters !== 1 ? 's' : ''}
                  </div>
                  <span className="text-purple-600 font-medium text-sm group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Universe Statistics</h2>
            <p className="text-slate-600">Explore the diversity of fictional universes in our database</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(
              universes.reduce((acc, universe) => {
                acc[universe.type] = (acc[universe.type] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            ).map(([type, count]) => (
              <div key={type} className="text-center">
                <div className="text-3xl mb-2">{getUniverseIcon(type)}</div>
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-600">{type.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
