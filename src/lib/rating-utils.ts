export interface RatingCategory {
  id: keyof CharacterRating
  name: string
  description: string
  icon: string
}

export interface CharacterRating {
  personality: number
  powers: number
  weaknesses: number
  origin: number
  impact: number
}

export const RATING_CATEGORIES: RatingCategory[] = [
  {
    id: 'personality',
    name: 'Personality & Traits',
    description: 'Character development, likability, and complexity',
    icon: '👤'
  },
  {
    id: 'powers',
    name: 'Powers & Abilities',
    description: 'Strength, special abilities, and combat skills',
    icon: '⚡'
  },
  {
    id: 'weaknesses',
    name: 'Weaknesses & Flaws',
    description: 'Vulnerabilities, character flaws, and limitations',
    icon: '💔'
  },
  {
    id: 'origin',
    name: 'Origin & Backstory',
    description: 'Background story quality and origin complexity',
    icon: '📖'
  },
  {
    id: 'impact',
    name: 'Role & Impact',
    description: 'Importance to story, cultural impact, and memorability',
    icon: '🌟'
  }
]

export const calculateOverallRating = (ratings: CharacterRating): number => {
  const { personality, powers, weaknesses, origin, impact } = ratings
  return (personality + powers + weaknesses + origin + impact) / 5
}

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-600'
  if (rating >= 6) return 'text-yellow-600'
  if (rating >= 4) return 'text-orange-600'
  return 'text-red-600'
}

export const getRatingText = (rating: number): string => {
  if (rating >= 9) return 'Exceptional'
  if (rating >= 8) return 'Excellent'
  if (rating >= 7) return 'Very Good'
  if (rating >= 6) return 'Good'
  if (rating >= 5) return 'Average'
  if (rating >= 4) return 'Below Average'
  if (rating >= 3) return 'Poor'
  return 'Terrible'
}
