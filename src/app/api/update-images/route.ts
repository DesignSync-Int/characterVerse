import { NextResponse } from 'next/server'
import { LegalImageService } from '@/lib/legal-image-service'

export async function POST() {
  try {
    console.log('🖼️  Starting character image updates...')
    
    const stats = await LegalImageService.updateAllCharacterImages()
    
    return NextResponse.json({
      success: true,
      message: 'Character images updated successfully',
      stats
    })
    
  } catch (error) {
    console.error('Error updating character images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update character images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Character Image Update API',
    description: 'POST to this endpoint to update all character images with legal sources',
    sources: [
      'TMDB (The Movie Database) - for movie/TV characters',
      'Wikimedia Commons - for public domain characters',
      'High-quality avatars - as fallback'
    ]
  })
}
