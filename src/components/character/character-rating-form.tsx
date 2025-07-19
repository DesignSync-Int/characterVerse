'use client'

import { useState } from 'react'
import { RATING_CATEGORIES } from '@/lib/rating-utils'
import { Star } from 'lucide-react'

interface CharacterRatingFormProps {
  characterId: string
}

export function CharacterRatingForm({ characterId }: CharacterRatingFormProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingChange = (categoryId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [categoryId]: rating
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId,
          ...ratings
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit rating')
      }

      const result = await response.json()
      console.log('Rating submitted successfully:', result)
      
      alert('Rating submitted successfully!')
      
      // Optionally refresh the page to show updated ratings
      window.location.reload()
    } catch (error) {
      console.error('Failed to submit rating:', error)
      alert('Failed to submit rating. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const allCategoriesRated = RATING_CATEGORIES.every(category => ratings[category.id])
  const overallRating = allCategoriesRated 
    ? Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / RATING_CATEGORIES.length
    : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RATING_CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="font-medium text-slate-900">{category.name}</h3>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(category.id, rating)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors flex items-center justify-center text-sm font-medium ${
                    ratings[category.id] >= rating
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'border-slate-300 text-slate-600 hover:border-purple-400'
                  }`}
                >
                  {rating}
                </button>
              ))}
              {ratings[category.id] && (
                <span className="ml-2 text-sm font-medium text-slate-700">
                  {ratings[category.id]}/10
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {allCategoriesRated && (
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-purple-900">Overall Rating:</span>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-600 fill-current" />
              <span className="text-lg font-bold text-purple-900">
                {overallRating.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!allCategoriesRated || isSubmitting}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
      </div>
    </form>
  )
}
