import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateOverallRating } from '@/lib/rating-utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { characterId, personality, powers, weaknesses, origin, impact } = await request.json()

    // Validate input
    if (!characterId || !personality || !powers || !weaknesses || !origin || !impact) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate rating values (1-10)
    const ratings = { personality, powers, weaknesses, origin, impact }
    for (const [key, value] of Object.entries(ratings)) {
      if (typeof value !== 'number' || value < 1 || value > 10) {
        return NextResponse.json({ error: `Invalid rating for ${key}` }, { status: 400 })
      }
    }

    const overall = calculateOverallRating(ratings)

    // Check if character exists
    const character = await prisma.character.findUnique({
      where: { id: characterId }
    })

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    // Upsert rating (update if exists, create if not)
    const rating = await prisma.rating.upsert({
      where: {
        userId_characterId: {
          userId: session.user.id,
          characterId
        }
      },
      update: {
        personality,
        powers,
        weaknesses,
        origin,
        impact,
        overall
      },
      create: {
        userId: session.user.id,
        characterId,
        personality,
        powers,
        weaknesses,
        origin,
        impact,
        overall
      }
    })

    // Update character's aggregated ratings
    const allRatings = await prisma.rating.findMany({
      where: { characterId }
    })

    const avgPersonality = allRatings.reduce((sum, r) => sum + r.personality, 0) / allRatings.length
    const avgPowers = allRatings.reduce((sum, r) => sum + r.powers, 0) / allRatings.length
    const avgWeaknesses = allRatings.reduce((sum, r) => sum + r.weaknesses, 0) / allRatings.length
    const avgOrigin = allRatings.reduce((sum, r) => sum + r.origin, 0) / allRatings.length
    const avgImpact = allRatings.reduce((sum, r) => sum + r.impact, 0) / allRatings.length
    const overallRating = (avgPersonality + avgPowers + avgWeaknesses + avgOrigin + avgImpact) / 5

    await prisma.character.update({
      where: { id: characterId },
      data: {
        avgPersonality,
        avgPowers,
        avgWeaknesses,
        avgOrigin,
        avgImpact,
        overallRating,
        totalRatings: allRatings.length
      }
    })

    return NextResponse.json({ 
      success: true, 
      rating,
      characterRating: {
        avgPersonality,
        avgPowers,
        avgWeaknesses,
        avgOrigin,
        avgImpact,
        overallRating,
        totalRatings: allRatings.length
      }
    })

  } catch (error) {
    console.error('Rating submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
