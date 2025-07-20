/**
 * Character Image Service
 * Handles multiple remote image sources with proper attribution
 */

export interface ImageSource {
  url: string
  source: string
  license: string
  attribution?: string
  width?: number
  height?: number
}

export class CharacterImageService {
  private static readonly TMDB_API_KEY = process.env.TMDB_API_KEY
  private static readonly FANART_API_KEY = process.env.FANART_API_KEY

  /**
   * Get optimized character image URL with fallbacks
   */
  static getCharacterImageUrl(character: {
    name: string
    imageUrl?: string | null
    tmdbId?: string | null
    wikimediaFile?: string | null
    universe?: string
  }, width: number = 400): string {
    // 1. Use stored image URL if available
    if (character.imageUrl) {
      return this.getOptimizedImageUrl(character.imageUrl, width)
    }

    // 2. Try TMDB for movie/TV characters
    if (character.tmdbId) {
      return `https://image.tmdb.org/t/p/w${width}${character.tmdbId}`
    }

    // 3. Try Wikimedia for public domain characters
    if (character.wikimediaFile) {
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${character.wikimediaFile}?width=${width}`
    }

    // 4. Generate avatar as fallback using UI Avatars
    const name = character.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${width}&background=random&color=fff&bold=true&format=png`
  }

  /**
   * Search for character images from multiple sources
   */
  static async searchCharacterImages(
    characterName: string, 
    universe: string
  ): Promise<ImageSource[]> {
    const sources: ImageSource[] = []

    try {
      // 1. Search TMDB for movie/TV characters
      if (this.TMDB_API_KEY) {
        const tmdbResults = await this.searchTMDB(characterName, universe)
        sources.push(...tmdbResults)
      }

      // 2. Search Wikimedia for public domain characters
      const wikimediaResults = await this.searchWikimedia(characterName)
      sources.push(...wikimediaResults)

      // 3. Add generated avatars
      const avatarSources = this.generateAvatarOptions(characterName)
      sources.push(...avatarSources)

    } catch (error) {
      console.error('Error searching character images:', error)
    }

    return sources
  }

  /**
   * Search TMDB for character images
   */
  private static async searchTMDB(characterName: string, universe: string): Promise<ImageSource[]> {
    if (!this.TMDB_API_KEY) return []

    try {
      // Search for movies/shows with the character
      const searchQuery = `${characterName} ${universe}`
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${this.TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()

      const results: ImageSource[] = []

      // Get poster images from search results
      data.results?.forEach((item: { poster_path?: string; backdrop_path?: string; title?: string; name?: string }) => {
        if (item.poster_path) {
          results.push({
            url: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            source: 'TMDB',
            license: 'Fair Use',
            attribution: `${item.title || item.name} - The Movie Database`,
            width: 500,
            height: 750
          })
        }

        if (item.backdrop_path) {
          results.push({
            url: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
            source: 'TMDB',
            license: 'Fair Use',
            attribution: `${item.title || item.name} - The Movie Database`,
            width: 1280,
            height: 720
          })
        }
      })

      return results.slice(0, 5) // Limit to 5 results
    } catch (error) {
      console.error('TMDB search error:', error)
      return []
    }
  }

  /**
   * Search Wikimedia Commons for public domain images
   */
  private static async searchWikimedia(characterName: string): Promise<ImageSource[]> {
    try {
      const searchQuery = `${characterName} character`
      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchQuery)}&srnamespace=6&srlimit=5&origin=*`
      )
      const data = await response.json()

      return data.query?.search?.map((result: { title: string }) => ({
        url: `https://commons.wikimedia.org/wiki/Special:FilePath/${result.title.replace('File:', '')}`,
        source: 'Wikimedia Commons',
        license: 'CC/Public Domain',
        attribution: 'Wikimedia Commons',
        width: 400,
        height: 400
      })) || []
    } catch (error) {
      console.error('Wikimedia search error:', error)
      return []
    }
  }

  /**
   * Generate avatar options using different styles
   */
  private static generateAvatarOptions(characterName: string): ImageSource[] {
    const name = characterName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    
    const colors = [
      { bg: '6366f1', color: 'fff', name: 'Purple' },
      { bg: 'ec4899', color: 'fff', name: 'Pink' },
      { bg: '3b82f6', color: 'fff', name: 'Blue' },
      { bg: '10b981', color: 'fff', name: 'Green' },
      { bg: 'f59e0b', color: 'fff', name: 'Orange' }
    ]

    return colors.map(({ bg, color, name: colorName }) => ({
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=${bg}&color=${color}&bold=true&format=png`,
      source: 'UI Avatars',
      license: 'Free',
      attribution: `${colorName} Avatar - UI Avatars`,
      width: 400,
      height: 400
    }))
  }

  /**
   * Get optimized image URL with proper sizing
   */
  static getOptimizedImageUrl(originalUrl: string, width: number = 400): string {
    // For UI Avatars
    if (originalUrl.includes('ui-avatars.com')) {
      return originalUrl.replace(/size=\d+/, `size=${width}`)
    }

    // For DiceBear avatars
    if (originalUrl.includes('dicebear.com')) {
      return `${originalUrl}&size=${width}`
    }

    // For TMDB images
    if (originalUrl.includes('tmdb.org')) {
      return originalUrl.replace(/\/w\d+/, `/w${width}`)
    }

    // For Wikimedia images
    if (originalUrl.includes('wikimedia.org')) {
      return originalUrl.includes('?') 
        ? `${originalUrl}&width=${width}`
        : `${originalUrl}?width=${width}`
    }

    return originalUrl
  }

  /**
   * Validate image URL and check if it's accessible
   */
  static async validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok && (response.headers.get('content-type')?.startsWith('image/') ?? false)
    } catch {
      return false
    }
  }

  /**
   * Get image metadata
   */
  static async getImageMetadata(url: string): Promise<{
    width?: number
    height?: number
    size?: number
    type?: string
  }> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('content-type')
      const contentLength = response.headers.get('content-length')

      return {
        type: contentType || undefined,
        size: contentLength ? parseInt(contentLength) : undefined
      }
    } catch {
      return {}
    }
  }
}
