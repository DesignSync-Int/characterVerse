/**
 * Commercial-Safe Character Image Service
 * Uses only sources that are free for commercial/professional use
 */

export interface CommercialImageSource {
  url: string
  source: 'Wikimedia' | 'Unsplash' | 'Generated' | 'Pixabay' | 'Pexels'
  license: string
  attribution: string
  confidence: number
  width: number
  height: number
  isCommercialSafe: true
}

export class CommercialImageService {
  private static readonly UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
  private static readonly PIXABAY_API_KEY = process.env.PIXABAY_API_KEY
  private static readonly PEXELS_API_KEY = process.env.PEXELS_API_KEY

  /**
   * Get commercial-safe character image
   */
  static async getCommercialSafeImage(character: {
    name: string
    universe?: { name: string }
    description?: string
    species?: string
  }): Promise<CommercialImageSource> {
    
    const sources = await this.getAllCommercialSources(character)
    
    // Pick the best commercial-safe source
    const bestSource = sources
      .filter(s => s.confidence > 0.3)
      .sort((a, b) => b.confidence - a.confidence)[0]
    
    return bestSource || this.getCommercialAvatar(character.name)
  }

  /**
   * Get all commercial-safe image sources
   */
  static async getAllCommercialSources(character: {
    name: string
    universe?: { name: string }
    description?: string
    species?: string
  }): Promise<CommercialImageSource[]> {
    
    const sources: CommercialImageSource[] = []

    try {
      // 1. Wikimedia Commons (Creative Commons/Public Domain)
      const wikimediaSources = await this.searchWikimediaCommercial(character.name)
      sources.push(...wikimediaSources)

      // 2. Unsplash (Free for commercial use)
      if (this.UNSPLASH_ACCESS_KEY) {
        const unsplashSources = await this.searchUnsplash(character)
        sources.push(...unsplashSources)
      }

      // 3. Pixabay (Free for commercial use)
      if (this.PIXABAY_API_KEY) {
        const pixabaySources = await this.searchPixabay(character)
        sources.push(...pixabaySources)
      }

      // 4. Pexels (Free for commercial use)
      if (this.PEXELS_API_KEY) {
        const pexelsSources = await this.searchPexels(character)
        sources.push(...pexelsSources)
      }

      // 5. Always include commercial-safe avatar
      sources.push(this.getCommercialAvatar(character.name))

    } catch (error) {
      console.error('Error getting commercial image sources:', error)
    }

    return sources
  }

  /**
   * Search Wikimedia Commons for commercial-safe images
   */
  private static async searchWikimediaCommercial(characterName: string): Promise<CommercialImageSource[]> {
    try {
      // Focus on public domain and CC0 content
      const searchTerms = [
        `${characterName} public domain`,
        `${characterName} CC0`,
        `${characterName} mythology`,
        `${characterName} literature classic`,
        `${characterName} historical`
      ]

      const sources: CommercialImageSource[] = []

      for (const term of searchTerms) {
        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(term + ' -copyright')}&srnamespace=6&srlimit=3&origin=*`
        )
        const data = await response.json()

        if (data.query?.search?.length > 0) {
          for (const result of data.query.search.slice(0, 2)) {
            const fileName = result.title.replace('File:', '')
            const confidence = this.calculateWikimediaCommercialConfidence(characterName, result)
            
            if (confidence > 0.4) { // Higher threshold for commercial use
              sources.push({
                url: `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}?width=500`,
                source: 'Wikimedia',
                license: 'Creative Commons / Public Domain (Commercial OK)',
                attribution: `Wikimedia Commons - ${fileName}`,
                confidence,
                width: 500,
                height: 500,
                isCommercialSafe: true
              })
            }
          }
        }
      }

      return sources
    } catch (error) {
      console.error('Wikimedia commercial search error:', error)
      return []
    }
  }

  /**
   * Search Unsplash for character-related images (Free for commercial use)
   */
  private static async searchUnsplash(character: {
    name: string
    universe?: { name: string }
    species?: string
  }): Promise<CommercialImageSource[]> {
    
    if (!this.UNSPLASH_ACCESS_KEY) return []

    try {
      // Create search terms that might find relevant artistic images
      const searchTerms = [
        `${character.species || 'person'} portrait art`,
        `${character.universe?.name || 'fantasy'} character`,
        `superhero art`,
        `fantasy portrait`,
        `comic art style`
      ]

      const sources: CommercialImageSource[] = []

      for (const term of searchTerms.slice(0, 2)) { // Limit API calls
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=3&orientation=portrait`,
          {
            headers: {
              'Authorization': `Client-ID ${this.UNSPLASH_ACCESS_KEY}`
            }
          }
        )
        const data = await response.json()

        if (data.results?.length > 0) {
          for (const result of data.results.slice(0, 1)) { // Just take the best one
            sources.push({
              url: result.urls.regular,
              source: 'Unsplash',
              license: 'Unsplash License (Free for commercial use)',
              attribution: `Photo by ${result.user.name} on Unsplash`,
              confidence: 0.3, // Generic artistic image
              width: result.width || 400,
              height: result.height || 600,
              isCommercialSafe: true
            })
          }
        }
      }

      return sources
    } catch (error) {
      console.error('Unsplash search error:', error)
      return []
    }
  }

  /**
   * Search Pixabay for character-related images (Free for commercial use)
   */
  private static async searchPixabay(character: {
    name: string
    universe?: { name: string }
    species?: string
  }): Promise<CommercialImageSource[]> {
    
    if (!this.PIXABAY_API_KEY) return []

    try {
      const searchTerms = [
        `${character.species || 'person'} cartoon`,
        `superhero illustration`,
        `fantasy character art`,
        `comic book style`
      ]

      const sources: CommercialImageSource[] = []

      for (const term of searchTerms.slice(0, 2)) {
        const response = await fetch(
          `https://pixabay.com/api/?key=${this.PIXABAY_API_KEY}&q=${encodeURIComponent(term)}&image_type=illustration&category=people&per_page=3&safesearch=true`
        )
        const data = await response.json()

        if (data.hits?.length > 0) {
          for (const result of data.hits.slice(0, 1)) {
            sources.push({
              url: result.webformatURL,
              source: 'Pixabay',
              license: 'Pixabay License (Free for commercial use)',
              attribution: `Image by ${result.user} from Pixabay`,
              confidence: 0.4, // Better than generic photos
              width: result.webformatWidth || 400,
              height: result.webformatHeight || 600,
              isCommercialSafe: true
            })
          }
        }
      }

      return sources
    } catch (error) {
      console.error('Pixabay search error:', error)
      return []
    }
  }

  /**
   * Search Pexels for character-related images (Free for commercial use)
   */
  private static async searchPexels(character: {
    name: string
    universe?: { name: string }
    species?: string
  }): Promise<CommercialImageSource[]> {
    
    if (!this.PEXELS_API_KEY) return []

    try {
      const searchTerms = [
        `${character.species || 'person'} portrait`,
        `superhero costume`,
        `fantasy portrait`,
        `character design`
      ]

      const sources: CommercialImageSource[] = []

      for (const term of searchTerms.slice(0, 2)) {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=3&orientation=portrait`,
          {
            headers: {
              'Authorization': this.PEXELS_API_KEY
            }
          }
        )
        const data = await response.json()

        if (data.photos?.length > 0) {
          for (const result of data.photos.slice(0, 1)) {
            sources.push({
              url: result.src.medium,
              source: 'Pexels',
              license: 'Pexels License (Free for commercial use)',
              attribution: `Photo by ${result.photographer} from Pexels`,
              confidence: 0.3,
              width: result.width || 400,
              height: result.height || 600,
              isCommercialSafe: true
            })
          }
        }
      }

      return sources
    } catch (error) {
      console.error('Pexels search error:', error)
      return []
    }
  }

  /**
   * Calculate confidence for Wikimedia commercial use
   */
  private static calculateWikimediaCommercialConfidence(characterName: string, result: {
    title: string
    snippet?: string
  }): number {
    const title = result.title.toLowerCase()
    const snippet = (result.snippet || '').toLowerCase()
    const charLower = characterName.toLowerCase()
    
    let confidence = 0

    // Strong indicators for commercial-safe content
    if (title.includes('public domain') || snippet.includes('public domain')) confidence += 0.4
    if (title.includes('cc0') || snippet.includes('cc0')) confidence += 0.4
    if (title.includes(charLower)) confidence += 0.3
    
    // Good indicators
    if (title.includes('mythology') || title.includes('literature')) confidence += 0.2
    if (title.includes('historical') || title.includes('classic')) confidence += 0.2
    
    // Negative indicators for commercial use
    if (title.includes('copyright') || snippet.includes('copyright')) confidence -= 0.5
    if (title.includes('©') || snippet.includes('©')) confidence -= 0.5
    if (title.includes('trademark') || snippet.includes('trademark')) confidence -= 0.3
    
    return Math.max(confidence, 0)
  }

  /**
   * Generate commercial-safe avatar
   */
  private static getCommercialAvatar(characterName: string): CommercialImageSource {
    const initials = characterName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

    // Professional color palette
    const colors = [
      { bg: '1f2937', color: 'ffffff' }, // Gray
      { bg: '374151', color: 'ffffff' }, // Dark gray
      { bg: '4338ca', color: 'ffffff' }, // Indigo
      { bg: '0891b2', color: 'ffffff' }, // Cyan
      { bg: '059669', color: 'ffffff' }, // Emerald
      { bg: 'dc2626', color: 'ffffff' }, // Red
    ]

    const colorIndex = characterName.length % colors.length
    const color = colors[colorIndex]

    return {
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=500&background=${color.bg}&color=${color.color}&bold=true&format=png&font-size=0.4&rounded=true`,
      source: 'Generated',
      license: 'Generated Avatar (Commercial OK)',
      attribution: 'Generated Avatar - No attribution required',
      confidence: 0.9, // High confidence as fallback
      width: 500,
      height: 500,
      isCommercialSafe: true
    }
  }

  /**
   * Batch update all characters with commercial-safe images
   */
  static async updateAllCharactersCommercial(): Promise<{
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
          // Skip if already has a commercial-safe image
          if (character.imageLicense?.includes('Commercial OK') || 
              character.imageLicense?.includes('commercial use')) {
            stats.skipped++
            continue
          }

          const newImage = await this.getCommercialSafeImage({
            name: character.name,
            universe: character.universe,
            description: character.description || undefined,
            species: character.species || undefined
          })
          
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
          console.log(`Updated ${character.name} with ${newImage.source} image (Commercial Safe)`)

          // Rate limit
          await new Promise(resolve => setTimeout(resolve, 200))
          
        } catch (error) {
          console.error(`Failed to update ${character.name}:`, error)
          stats.failed++
        }
      }
      
    } catch (error) {
      console.error('Commercial batch update error:', error)
    }

    return stats
  }
}
