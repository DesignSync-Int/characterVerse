import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Plus, Users, Heart } from 'lucide-react'

// Sample character lists for demo
const SAMPLE_LISTS = [
  {
    id: '1',
    title: 'Best Anime Protagonists',
    description: 'The most compelling main characters from anime series',
    characterCount: 25,
    likes: 1420,
    author: 'AnimeExpert92',
    coverImages: ['🐉', '🍥', '⚔️', '🔥']
  },
  {
    id: '2',
    title: 'Marvel Powerhouses',
    description: 'Characters with incredible strength and abilities',
    characterCount: 18,
    likes: 892,
    author: 'ComicBookGuru',
    coverImages: ['🕷️', '⚡', '🛡️', '🔨']
  },
  {
    id: '3',
    title: 'Best Character Development',
    description: 'Characters who underwent amazing transformations',
    characterCount: 30,
    likes: 756,
    author: 'StoryAnalyst',
    coverImages: ['🦇', '🔥', '⚡', '🌟']
  },
  {
    id: '4',
    title: 'Legendary Villains',
    description: 'The most memorable antagonists across all media',
    characterCount: 22,
    likes: 634,
    author: 'DarkSideFan',
    coverImages: ['💀', '👑', '⚡', '🔥']
  },
  {
    id: '5',
    title: 'Female Powerhouses',
    description: 'Strong female characters who break stereotypes',
    characterCount: 20,
    likes: 1100,
    author: 'HeroinesFan',
    coverImages: ['⚡', '🌟', '🏹', '💎']
  },
  {
    id: '6',
    title: 'Underrated Gems',
    description: 'Amazing characters that deserve more recognition',
    characterCount: 15,
    likes: 445,
    author: 'HiddenGemsCollector',
    coverImages: ['🌙', '🔮', '⭐', '💫']
  }
]

export default function ListsPage() {
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
              HERO LISTS
            </h1>
            <div className="speech-bubble max-w-2xl mx-auto">
              <p className="text-black font-bold">
                📚 Discover curated collections of characters created by the community! 📚
              </p>
            </div>
          </div>

          {/* Create List CTA */}
          <div className="text-center mb-12">
            <Link
              href="/auth/signin"
              className="comic-button px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-6 w-6 mr-2 inline" />
              CREATE YOUR LIST
            </Link>
            <p className="text-white mt-4">Sign in to create and share your own character lists!</p>
          </div>

          {/* Lists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_LISTS.map((list) => (
              <div
                key={list.id}
                className="comic-card hover:scale-105 transition-all duration-200 overflow-hidden group relative"
              >
                {/* Character previews */}
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center halftone-bg">
                    <div className="grid grid-cols-2 gap-4">
                      {list.coverImages.map((emoji, index) => (
                        <div key={index} className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-black">
                          <span className="text-2xl">{emoji}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Character count badge */}
                  <div className="absolute top-4 right-4">
                    <div className="comic-button px-3 py-2 text-sm font-bold bg-blue-400 text-black">
                      {list.characterCount} heroes
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800">
                  <h3 className="comic-title text-2xl text-yellow-400 mb-3 group-hover:text-orange-400 transition-colors">
                    {list.title}
                  </h3>
                  <p className="text-white mb-4 text-sm leading-relaxed">
                    {list.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-blue-300">
                      <Users className="h-4 w-4 mr-1" />
                      {list.author}
                    </div>
                    <div className="flex items-center text-pink-300">
                      <Heart className="h-4 w-4 mr-1" />
                      {list.likes}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="comic-button w-full py-2 text-sm bg-yellow-400 text-black hover:bg-orange-400">
                      VIEW LIST →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <section className="mt-20">
            <h2 className="comic-title text-4xl text-yellow-400 mb-8 text-center">
              BROWSE BY CATEGORY
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Anime', icon: '🍥', count: 45 },
                { name: 'Marvel', icon: '🕷️', count: 32 },
                { name: 'DC Comics', icon: '🦇', count: 28 },
                { name: 'Manga', icon: '📚', count: 38 },
                { name: 'Movies', icon: '🎬', count: 25 },
                { name: 'TV Shows', icon: '📺', count: 22 },
                { name: 'Games', icon: '🎮', count: 19 },
                { name: 'Mythology', icon: '⚡', count: 15 }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/lists/category/${category.name.toLowerCase()}`}
                  className="comic-card p-6 text-center hover:scale-105 transition-all duration-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-black">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="comic-title text-xl text-yellow-400 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white text-sm">
                    {category.count} lists
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="speech-bubble max-w-lg mx-auto mb-8">
              <p className="text-black font-bold">
                Join the community and share your favorite character collections!
              </p>
            </div>
            <Link
              href="/auth/signin"
              className="comic-button px-8 py-4 text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
            >
              🚀 JOIN THE LEAGUE 🚀
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
