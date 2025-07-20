import Link from 'next/link'
import { Star } from 'lucide-react'
import { CharacterImage } from "@/components/ui/character-image";

// Sample characters for demo
const FEATURED_CHARACTERS = [
  {
    id: "1",
    name: "Spider-Man",
    universe: "Marvel Comics",
    overallRating: 8.7,
    totalRatings: 1250,
  },
  {
    id: "2",
    name: "Goku",
    universe: "Dragon Ball",
    overallRating: 9.2,
    totalRatings: 2180,
  },
  {
    id: "3",
    name: "Batman",
    universe: "DC Comics",
    overallRating: 8.9,
    totalRatings: 1876,
  },
  {
    id: "4",
    name: "Naruto",
    universe: "Naruto",
    overallRating: 8.5,
    totalRatings: 1654,
  },
  {
    id: "5",
    name: "Wonder Woman",
    universe: "DC Comics",
    overallRating: 8.3,
    totalRatings: 987,
  },
  {
    id: "6",
    name: "Luffy",
    universe: "One Piece",
    overallRating: 8.8,
    totalRatings: 1432,
  },
];

export function FeaturedCharacters() {
  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return 'text-green-600 bg-green-50'
    if (rating >= 7.5) return 'text-yellow-600 bg-yellow-50'
    return 'text-orange-600 bg-orange-50'
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Trending Characters
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the most popular and highly-rated characters across all
            universes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CHARACTERS.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                <CharacterImage
                  character={{
                    name: character.name,
                    universe: character.universe,
                  }}
                  size="md"
                  showAttribution={false}
                  className="w-full h-full object-cover"
                />

                {/* Rating overlay */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getRatingColor(
                      character.overallRating
                    )}`}
                  >
                    ⭐ {character.overallRating}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {character.name}
                </h3>
                <p className="text-slate-600 mb-4">{character.universe}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-slate-500">
                    <Star className="h-4 w-4 mr-1" />
                    {character.totalRatings.toLocaleString()} ratings
                  </div>
                  <span className="text-purple-600 font-medium text-sm group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/characters"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View All Characters
          </Link>
        </div>
      </div>
    </section>
  );
}
