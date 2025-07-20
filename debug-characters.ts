import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function debugCharacters() {
  try {
    console.log('🔍 Debugging character data...')
    
    // Get all characters with image data
    const characters = await prisma.character.findMany({
      select: {
        name: true,
        imageUrl: true,
        imageSource: true,
        tmdbId: true,
        wikimediaFile: true
      }
    })
    
    characters.forEach(character => {
      console.log(`📝 ${character.name}:`)
      console.log(`   imageUrl: ${character.imageUrl}`)
      console.log(`   imageSource: ${character.imageSource}`)
      console.log(`   tmdbId: ${character.tmdbId}`)
      console.log(`   wikimediaFile: ${character.wikimediaFile}`)
      console.log('---')
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugCharacters()
