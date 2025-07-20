import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateImageUrls() {
  try {
    console.log('🔄 Setting UI Avatars PNG format URLs for all characters...')
    
    // Get all characters
    const characters = await prisma.character.findMany()
    
    for (const character of characters) {
      // Generate UI Avatars PNG URL with character initials
      const initials = character.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
      
      const newImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=160&background=random&color=fff&bold=true&format=png`
      
      await prisma.character.update({
        where: { id: character.id },
        data: { 
          imageUrl: newImageUrl,
          imageSource: 'UI Avatars',
          imageLicense: 'Free',
          imageAttribution: 'UI Avatars Service'
        }
      })
      
      console.log(`✅ Updated ${character.name}: ${newImageUrl}`)
    }
    
    console.log('🎉 All character images updated successfully!')
  } catch (error) {
    console.error('❌ Error updating image URLs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateImageUrls()
