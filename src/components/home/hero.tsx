import Link from 'next/link'
import { Star, Users, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Rate & Discover
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Fictional Characters
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform for rating and discovering fictional characters across comics, anime, movies, TV shows, games, and mythology. Like IMDb, but for characters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/characters" 
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Explore Characters
            </Link>
            <Link 
              href="/auth/signin" 
              className="border border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Join Community
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">1,000+</span>
              </div>
              <p className="text-slate-600">Characters</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">50K+</span>
              </div>
              <p className="text-slate-600">Ratings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">25+</span>
              </div>
              <p className="text-slate-600">Universes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
