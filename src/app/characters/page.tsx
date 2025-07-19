import { prisma } from '@/lib/prisma'
import { CharacterCard } from '@/components/character/character-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Search } from 'lucide-react'

export default async function CharactersPage() {
  const characters = await prisma.character.findMany({
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
    }
  })

  const universes = await prisma.universe.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">All Characters</h1>
          <p className="text-lg text-slate-600">
            Discover and rate fictional characters from across all universes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search characters..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Universe Filter */}
            <div className="lg:w-64">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">All Universes</option>
                {universes.map((universe) => (
                  <option key={universe.id} value={universe.id}>
                    {universe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="lg:w-48">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="name">Alphabetical</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Load More Characters
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
