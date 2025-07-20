/**
 * Legal Character Image Service
 * Uses only copyright-safe image sources with proper attribution
 */

export interface LegalImageSource {
  url: string
  source: 'TMDB' | 'Wikimedia' | 'Generated' | 'UI_Avatars'
  license: string
  attribution: string
  confidence: number // 0-1, how likely this matches the character
  width: number
  height: number
}

export class LegalImageService {
  private static readonly TMDB_API_KEY = process.env.TMDB_API_KEY
  private static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY

  /**
   * Get the best legal image for a character
   */
  static async getBestLegalImage(character: {
    name: string
    universe?: { name: string }
    description?: string
    species?: string
    occupation?: string
  }): Promise<LegalImageSource> {
    
    const sources = await this.getAllLegalSources(character)
    
    // Sort by confidence and pick the best one
    const bestSource = sources
      .filter(s => s.confidence > 0.3)
      .sort((a, b) => b.confidence - a.confidence)[0]
    
    return bestSource || this.getFallbackAvatar(character.name)
  }

  /**
   * Get all available legal image sources for a character
   */
  static async getAllLegalSources(character: {
    name: string
    universe?: { name: string }
    description?: string
    species?: string
    occupation?: string
  }): Promise<LegalImageSource[]> {
    
    const sources: LegalImageSource[] = []

    try {
      // 1. Try TMDB for movie/TV characters
      if (this.TMDB_API_KEY && character.universe) {
        const tmdbSources = await this.searchTMDB(character.name, character.universe.name)
        sources.push(...tmdbSources)
      }

      // 2. Try Wikimedia for public domain characters
      const wikimediaSources = await this.searchWikimedia(character.name)
      sources.push(...wikimediaSources)

      // 3. Add high-quality avatar as fallback
      sources.push(this.getFallbackAvatar(character.name))

    } catch (error) {
      console.error('Error getting legal image sources:', error)
    }

    return sources
  }

  /**
   * Search TMDB with better character matching
   */
  private static async searchTMDB(characterName: string, universeName: string): Promise<LegalImageSource[]> {
    if (!this.TMDB_API_KEY) return []

    try {
      const sources: LegalImageSource[] = []

      // Search for the character's franchise/universe
      const searchQueries = [
        `${characterName} ${universeName}`,
        universeName,
        characterName
      ]

      for (const query of searchQueries) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${this.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        )
        const data = await response.json()

        if (data.results?.length > 0) {
          // Get poster from most relevant result
          const topResult = data.results[0]
          const confidence = this.calculateTMDBConfidence(characterName, universeName, topResult)
          
          if (topResult.poster_path) {
            sources.push({
              url: `https://image.tmdb.org/t/p/w500${topResult.poster_path}`,
              source: 'TMDB',
              license: 'Fair Use (TMDB API)',
              attribution: `${topResult.title || topResult.name} - The Movie Database (TMDB)`,
              confidence,
              width: 500,
              height: 750
            })
          }

          // Also check for backdrop if it's a good match
          if (topResult.backdrop_path && confidence > 0.7) {
            sources.push({
              url: `https://image.tmdb.org/t/p/w1280${topResult.backdrop_path}`,
              source: 'TMDB',
              license: 'Fair Use (TMDB API)',
              attribution: `${topResult.title || topResult.name} - The Movie Database (TMDB)`,
              confidence: confidence * 0.8, // Backdrop slightly less preferred
              width: 1280,
              height: 720
            })
          }
        }
      }

      return sources
    } catch (error) {
      console.error('TMDB search error:', error)
      return []
    }
  }

  /**
   * Calculate confidence score for TMDB results
   */
  private static calculateTMDBConfidence(characterName: string, universeName: string, result: {
    title?: string
    name?: string
    overview?: string
    vote_average?: number
  }): number {
    const title = (result.title || result.name || '').toLowerCase()
    const overview = (result.overview || '').toLowerCase()
    
    const charLower = characterName.toLowerCase()
    const universeLower = universeName.toLowerCase()
    
    let confidence = 0

    // Check if universe name is in title
    if (title.includes(universeLower)) confidence += 0.4
    
    // Check if character name is in title or overview
    if (title.includes(charLower)) confidence += 0.3
    if (overview.includes(charLower)) confidence += 0.2
    
    // Boost for exact matches
    if (title === universeLower || title.includes(`${universeLower}:`)) confidence += 0.3
    
    // Boost for high-rated content
    if (result.vote_average && result.vote_average > 7) confidence += 0.1
    
    return Math.min(confidence, 1)
  }

  /**
   * Search Wikimedia Commons for public domain character images
   */
  private static async searchWikimedia(characterName: string): Promise<LegalImageSource[]> {
    try {
      // Search for character in public domain sources
      const searchTerms = [
        `${characterName} character`,
        `${characterName} mythology`,
        `${characterName} literature`,
        `${characterName} public domain`
      ]

      const sources: LegalImageSource[] = []

      for (const term of searchTerms) {
        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(term)}&srnamespace=6&srlimit=3&origin=*`
        )
        const data = await response.json()

        if (data.query?.search?.length > 0) {
          for (const result of data.query.search.slice(0, 2)) {
            const fileName = result.title.replace('File:', '')
            const confidence = this.calculateWikimediaConfidence(characterName, result)
            
            if (confidence > 0.2) {
              sources.push({
                url: `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}?width=500`,
                source: 'Wikimedia',
                license: 'Creative Commons / Public Domain',
                attribution: `Wikimedia Commons - ${fileName}`,
                confidence,
                width: 500,
                height: 500
              })
            }
          }
        }
      }

      return sources
    } catch (error) {
      console.error('Wikimedia search error:', error)
      return []
    }
  }

  /**
   * Calculate confidence for Wikimedia results
   */
  private static calculateWikimediaConfidence(characterName: string, result: {
    title: string
    snippet?: string
  }): number {
    const title = result.title.toLowerCase()
    const snippet = (result.snippet || '').toLowerCase()
    const charLower = characterName.toLowerCase()
    
    let confidence = 0

    // Exact character name match
    if (title.includes(charLower)) confidence += 0.4
    if (snippet.includes(charLower)) confidence += 0.3
    
    // Positive indicators
    if (title.includes('character') || snippet.includes('character')) confidence += 0.2
    if (title.includes('illustration') || title.includes('artwork')) confidence += 0.1
    
    // Negative indicators
    if (title.includes('logo') || title.includes('symbol')) confidence -= 0.3
    if (title.includes('text') || title.includes('diagram')) confidence -= 0.2
    
    return Math.max(confidence, 0)
  }

  /**
   * Generate high-quality fallback avatar
   */
  private static getFallbackAvatar(characterName: string): LegalImageSource {
    const initials = characterName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

    // Use better color scheme for character avatars
    const colors = [
      { bg: 'dc2626', color: 'ffffff' }, // Red
      { bg: '2563eb', color: 'ffffff' }, // Blue  
      { bg: '059669', color: 'ffffff' }, // Green
      { bg: '7c2d12', color: 'ffffff' }, // Brown
      { bg: '4338ca', color: 'ffffff' }, // Indigo
      { bg: 'be123c', color: 'ffffff' }, // Rose
    ]

    // Use character name to consistently pick a color
    const colorIndex = characterName.length % colors.length
    const color = colors[colorIndex]

    return {
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=500&background=${color.bg}&color=${color.color}&bold=true&format=png&font-size=0.4`,
      source: 'UI_Avatars',
      license: 'Free',
      attribution: 'Generated Avatar',
      confidence: 0.1, // Low confidence, use as fallback
      width: 500,
      height: 500
    }
  }

  /**
   * Update character with best available legal image
   */
  static async updateCharacterImage(characterId: string, character: {
    name: string
    universe?: { name: string }
    description?: string
  }): Promise<LegalImageSource | null> {
    
    try {
      const bestImage = await this.getBestLegalImage(character)
      
      // Update the character in database with new image info
      const { prisma } = await import('@/lib/prisma')
      
      await prisma.character.update({
        where: { id: characterId },
        data: {
          imageUrl: bestImage.url,
          imageSource: bestImage.source,
          imageLicense: bestImage.license,
          imageAttribution: bestImage.attribution
        }
      })

      return bestImage
    } catch (error) {
      console.error('Error updating character image:', error)
      return null
    }
  }

  /**
   * Batch update all characters with better images
   */
  static async updateAllCharacterImages(): Promise<{
    updated: number
    failed: number
    skipped: number
  }> {
    
    const stats = { updated: 0, failed: 0, skipped: 0 }
    
    try {
      const { prisma } = await import('@/lib/prisma')
      
      const characters = await prisma.character.findMany({
        include: { universe: true }
      })

      for (const character of characters) {
        try {
          // Skip if already has a good image from TMDB or Wikimedia
          if (character.imageSource === 'TMDB' || character.imageSource === 'Wikimedia') {
            stats.skipped++
            continue
          }

          const newImage = await this.getBestLegalImage({
            name: character.name,
            universe: character.universe,
            description: character.description || undefined,
            species: character.species || undefined,
            occupation: character.occupation || undefined
          })
          
          if (newImage.source !== 'UI_Avatars') {
            await prisma.character.update({
              where: { id: character.id },
              data: {
                imageUrl: newImage.url,
                imageSource: newImage.source,
                imageLicense: newImage.license,
                imageAttribution: newImage.attribution
              }
            })
            stats.updated++
            console.log(`Updated ${character.name} with ${newImage.source} image`)
          } else {
            stats.skipped++
          }

          // Rate limit to be nice to APIs
          await new Promise(resolve => setTimeout(resolve, 100))
          
        } catch (error) {
          console.error(`Failed to update ${character.name}:`, error)
          stats.failed++
        }
      }
      
    } catch (error) {
      console.error('Batch update error:', error)
    }

    return stats
  }
}
