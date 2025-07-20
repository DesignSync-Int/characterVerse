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
    <div className="min-h-screen bg-slate-50 relative">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search your favorite characters..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all"
                />
              </div>
            </div>

            {/* Universe Filter */}
            <div className="lg:w-64">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all">
                <option value="">🌌 All Universes</option>
                {universes.map((universe) => (
                  <option key={universe.id} value={universe.id}>
                    {universe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="lg:w-48">
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all">
                <option value="rating">⭐ Highest Rated</option>
                <option value="popular">🔥 Most Popular</option>
                <option value="name">🔤 Alphabetical</option>
                <option value="newest">🆕 Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {characters.map((character) => (
            <div
              key={character.id}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <CharacterCard character={character} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600">
                {characters.length}
              </div>
              <div className="text-sm text-slate-600">Characters</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600">
                {universes.length}
              </div>
              <div className="text-sm text-slate-600">Universes</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600">
                {characters.reduce((sum, char) => sum + char._count.ratings, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Ratings</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600">
                {characters.reduce((sum, char) => sum + char._count.reviews, 0)}
              </div>
              <div className="text-sm text-slate-600">Reviews</div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg">
            Load More Characters
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
