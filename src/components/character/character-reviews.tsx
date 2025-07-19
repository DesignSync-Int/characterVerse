import { ThumbsUp, User } from 'lucide-react'
import Image from 'next/image'

interface Review {
  id: string
  title: string | null
  content: string
  isRecommended: boolean | null
  helpfulCount: number
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface CharacterReviewsProps {
  reviews: Review[]
}

export function CharacterReviews({ reviews }: CharacterReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No reviews yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-slate-200 pb-6 last:border-b-0">
          {/* Review Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {review.user.image ? (
                <Image
                  src={review.user.image}
                  alt={review.user.name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900">
                  {review.user.name || 'Anonymous User'}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {review.isRecommended !== null && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                review.isRecommended 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                <ThumbsUp className={`h-3 w-3 ${review.isRecommended ? '' : 'rotate-180'}`} />
                <span>{review.isRecommended ? 'Recommended' : 'Not Recommended'}</span>
              </div>
            )}
          </div>

          {/* Review Content */}
          {review.title && (
            <h4 className="font-medium text-slate-900 mb-2">{review.title}</h4>
          )}
          <p className="text-slate-700 leading-relaxed mb-3">{review.content}</p>

          {/* Review Actions */}
          <div className="flex items-center space-x-4 text-sm">
            <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful ({review.helpfulCount})</span>
            </button>
            <button className="text-slate-500 hover:text-slate-700 transition-colors">
              Reply
            </button>
            <button className="text-slate-500 hover:text-slate-700 transition-colors">
              Report
            </button>
          </div>
        </div>
      ))}

      {/* Load More */}
      {reviews.length >= 5 && (
        <div className="text-center pt-4">
          <button className="px-6 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}
