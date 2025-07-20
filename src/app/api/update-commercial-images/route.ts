import { NextResponse } from 'next/server'
import { CommercialImageService } from '@/lib/commercial-image-service'

export async function POST() {
  try {
    console.log('🏢 Starting commercial-safe character image updates...')
    
    const stats = await CommercialImageService.updateAllCharactersCommercial()
    
    return NextResponse.json({
      success: true,
      message: 'Character images updated with commercial-safe sources',
      stats,
      sources: [
        'Wikimedia Commons (Public Domain/CC)',
        'Unsplash (Free for commercial use)',
        'Pixabay (Free for commercial use)', 
        'Pexels (Free for commercial use)',
        'Generated Avatars (No restrictions)'
      ]
    })
    
  } catch (error) {
    console.error('Error updating commercial images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update commercial-safe images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Commercial-Safe Character Image Update API',
    description: 'POST to this endpoint to update all character images with commercial-safe sources',
    commercialSafeSources: [
      {
        name: 'Wikimedia Commons',
        license: 'Public Domain / Creative Commons',
        commercialUse: true,
        description: 'Historical and mythological characters'
      },
      {
        name: 'Unsplash',
        license: 'Unsplash License',
        commercialUse: true,
        description: 'High-quality artistic photos'
      },
      {
        name: 'Pixabay',
        license: 'Pixabay License',
        commercialUse: true,
        description: 'Illustrations and cartoon-style images'
      },
      {
        name: 'Pexels',
        license: 'Pexels License',
        commercialUse: true,
        description: 'Professional stock photos'
      },
      {
        name: 'Generated Avatars',
        license: 'No restrictions',
        commercialUse: true,
        description: 'High-quality generated character avatars'
      }
    ],
    setup: {
      unsplash: 'https://unsplash.com/developers',
      pixabay: 'https://pixabay.com/api/docs/',
      pexels: 'https://www.pexels.com/api/'
    }
  })
}
