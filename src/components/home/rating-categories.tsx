import { RATING_CATEGORIES } from '@/lib/rating-utils'

export function RatingCategories() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Comprehensive Character Rating System
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Rate characters across five detailed categories to build the most comprehensive character database ever created.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RATING_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
              </div>
              <p className="text-slate-600">{category.description}</p>
              
              {/* Sample Rating */}
              <div className="mt-4 flex items-center">
                <span className="text-sm text-slate-500 mr-2">Sample:</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < 4 ? 'bg-purple-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700 ml-2">8.0/10</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-purple-50 rounded-lg">
            <span className="text-purple-600 font-medium">
              🎯 Each rating contributes to the character&apos;s overall score and ranking
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
