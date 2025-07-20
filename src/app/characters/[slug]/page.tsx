import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CharacterRatingForm } from '@/components/character/character-rating-form'
import { CharacterReviews } from '@/components/character/character-reviews'
import { RATING_CATEGORIES, getRatingColor } from '@/lib/rating-utils'
import Image from 'next/image'

interface CharacterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  const character = await prisma.character.findUnique({
    where: { slug },
    include: {
      universe: true,
      ratings: {
        include: {
          user: true,
        },
      },
      reviews: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          ratings: true,
          reviews: true,
        },
      },
    },
  });

  if (!character) {
    notFound()
  }

  const powers = character.powers ? JSON.parse(character.powers) : []
  const aliases = character.aliases ? JSON.parse(character.aliases) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Character Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-slate-200">
          <div className="lg:flex">
            {/* Character Image */}
            <div className="lg:w-1/3">
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                {character.imageUrl ? (
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-400 text-center">
                      <div className="w-24 h-24 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                      <span className="text-lg">{character.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Character Info */}
            <div className="lg:w-2/3 p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{character.name}</h1>
                  <p className="text-lg text-slate-600">{character.universe.name}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getRatingColor(character.overallRating)}`}>
                    {character.overallRating.toFixed(1)}/10
                  </div>
                  <div className="text-sm text-slate-500">
                    {character._count.ratings} ratings
                  </div>
                </div>
              </div>

              {/* Rating Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {RATING_CATEGORIES.map((category) => {
                  const rating = character[`avg${category.id.charAt(0).toUpperCase() + category.id.slice(1)}` as keyof typeof character] as number
                  return (
                    <div key={category.id} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        <span className="text-lg font-bold text-slate-900">{rating.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${(rating / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Character Details */}
              <div className="space-y-4">
                {character.species && (
                  <div>
                    <span className="font-medium text-slate-700">Species: </span>
                    <span className="text-slate-600">{character.species}</span>
                  </div>
                )}
                {character.occupation && (
                  <div>
                    <span className="font-medium text-slate-700">Occupation: </span>
                    <span className="text-slate-600">{character.occupation}</span>
                  </div>
                )}
                {character.firstAppearance && (
                  <div>
                    <span className="font-medium text-slate-700">First Appearance: </span>
                    <span className="text-slate-600">{character.firstAppearance}</span>
                  </div>
                )}
                {character.creator && (
                  <div>
                    <span className="font-medium text-slate-700">Creator: </span>
                    <span className="text-slate-600">{character.creator}</span>
                  </div>
                )}
              </div>

              {/* Powers */}
              {powers.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-slate-700 mb-2">Powers & Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {powers.map((power: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {power}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Aliases */}
              {aliases.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-slate-700 mb-2">Also Known As</h3>
                  <p className="text-slate-600">{aliases.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {character.description && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About {character.name}</h2>
            <p className="text-slate-700 leading-relaxed">{character.description}</p>
          </div>
        )}

        {/* Rating Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Rate This Character</h2>
          <CharacterRatingForm characterId={character.id} />
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Reviews ({character._count.reviews})
            </h2>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Write Review
            </button>
          </div>
          <CharacterReviews reviews={character.reviews} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
