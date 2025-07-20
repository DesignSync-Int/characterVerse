/**
 * CharacterVerse Demo Data Seeder
 * 
 * This script populates the database with sample data for testing
 * the remote image system and comic book styling.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SAMPLE_UNIVERSES = [
  {
    name: 'Marvel Comics',
    type: 'COMICS' as const,
    description: 'Marvel Comics universe featuring superheroes, mutants, and cosmic entities.',
    slug: 'marvel-comics'
  },
  {
    name: 'DC Comics', 
    type: 'COMICS' as const,
    description: 'DC Comics universe with iconic superheroes and villains.',
    slug: 'dc-comics'
  },
  {
    name: 'Dragon Ball',
    type: 'ANIME' as const,
    description: 'Epic martial arts anime series by Akira Toriyama.',
    slug: 'dragon-ball'
  },
  {
    name: 'Naruto',
    type: 'ANIME' as const,
    description: 'Ninja anime series following Naruto Uzumaki.',
    slug: 'naruto'
  },
  {
    name: 'One Piece',
    type: 'ANIME' as const,
    description: 'Pirate adventure anime by Eiichiro Oda.',
    slug: 'one-piece'
  },
  {
    name: 'Marvel Cinematic Universe',
    type: 'MOVIES' as const,
    description: 'Marvel superhero movie franchise.',
    slug: 'mcu'
  }
]

const SAMPLE_CHARACTERS = [
  {
    name: 'Spider-Man',
    slug: 'spider-man',
    description: 'Peter Parker, a young photographer bitten by a radioactive spider, gains spider-like powers and becomes the web-slinging superhero Spider-Man.',
    universeSlug: 'marvel-comics',
    species: 'Human (Enhanced)',
    occupation: 'Superhero, Photographer',
    powers: JSON.stringify(['Wall-crawling', 'Spider-sense', 'Superhuman strength', 'Web-shooting']),
    aliases: JSON.stringify(['Peter Parker', 'Web-head', 'Your Friendly Neighborhood Spider-Man']),
    firstAppearance: 'Amazing Fantasy #15 (1962)',
    creator: 'Stan Lee, Steve Ditko',
    overallRating: 8.7,
    totalRatings: 1250
  },
  {
    name: 'Batman',
    slug: 'batman',
    description: 'Bruce Wayne, a billionaire who fights crime in Gotham City using advanced technology and martial arts after witnessing his parents\' murder.',
    universeSlug: 'dc-comics',
    species: 'Human',
    occupation: 'Vigilante, CEO of Wayne Enterprises',
    powers: JSON.stringify(['Master detective', 'Martial arts expert', 'Advanced technology', 'Peak human condition']),
    aliases: JSON.stringify(['Bruce Wayne', 'The Dark Knight', 'The Caped Crusader', 'The World\'s Greatest Detective']),
    firstAppearance: 'Detective Comics #27 (1939)',
    creator: 'Bob Kane, Bill Finger',
    overallRating: 8.9,
    totalRatings: 1876
  },
  {
    name: 'Goku',
    slug: 'goku',
    description: 'Son Goku, a Saiyan warrior raised on Earth who becomes its greatest protector through his incredible fighting abilities and pure heart.',
    universeSlug: 'dragon-ball',
    species: 'Saiyan',
    occupation: 'Martial Artist, Farmer',
    powers: JSON.stringify(['Super Saiyan transformations', 'Ki manipulation', 'Instant transmission', 'Ultra instinct']),
    aliases: JSON.stringify(['Son Goku', 'Kakarot', 'Super Saiyan']),
    firstAppearance: 'Dragon Ball Chapter 1 (1984)',
    creator: 'Akira Toriyama',
    overallRating: 9.2,
    totalRatings: 2180
  },
  {
    name: 'Wonder Woman',
    slug: 'wonder-woman',
    description: 'Diana Prince, an Amazonian warrior princess with divine powers who protects both her homeland and the world of men.',
    universeSlug: 'dc-comics',
    species: 'Amazon/Demigod',
    occupation: 'Superhero, Ambassador',
    powers: JSON.stringify(['Superhuman strength', 'Flight', 'Lasso of Truth', 'Bulletproof bracelets', 'Divine powers']),
    aliases: JSON.stringify(['Diana Prince', 'Princess Diana of Themyscira']),
    firstAppearance: 'All Star Comics #8 (1941)',
    creator: 'William Moulton Marston',
    overallRating: 8.3,
    totalRatings: 987
  },
  {
    name: 'Naruto Uzumaki',
    slug: 'naruto-uzumaki',
    description: 'A young ninja with a powerful demon fox sealed within him, who dreams of becoming the strongest ninja and leader of his village.',
    universeSlug: 'naruto',
    species: 'Human (Jinchuriki)',
    occupation: 'Ninja, Hokage',
    powers: JSON.stringify(['Nine-Tails chakra', 'Shadow clones', 'Rasengan', 'Sage mode', 'Six Paths mode']),
    aliases: JSON.stringify(['Naruto Uzumaki', 'Seventh Hokage', 'Hero of the Hidden Leaf']),
    firstAppearance: 'Naruto Chapter 1 (1999)',
    creator: 'Masashi Kishimoto',
    overallRating: 8.5,
    totalRatings: 1654
  },
  {
    name: 'Monkey D. Luffy',
    slug: 'monkey-d-luffy',
    description: 'A young pirate captain with rubber powers who explores the Grand Line in search of the legendary treasure One Piece.',
    universeSlug: 'one-piece',
    species: 'Human (Devil Fruit User)',
    occupation: 'Pirate Captain',
    powers: JSON.stringify(['Rubber body', 'Gear transformations', 'Haki', 'Devil fruit awakening']),
    aliases: JSON.stringify(['Straw Hat Luffy', 'Monkey D. Luffy']),
    firstAppearance: 'One Piece Chapter 1 (1997)',
    creator: 'Eiichiro Oda',
    overallRating: 8.8,
    totalRatings: 1432
  }
]

async function seedDatabase() {
  console.log('🌱 Seeding CharacterVerse database...')
  
  try {
    // Clear existing data
    await prisma.character.deleteMany()
    await prisma.universe.deleteMany()
    
    console.log('📚 Creating universes...')
    // Create universes
    for (const universe of SAMPLE_UNIVERSES) {
      await prisma.universe.create({
        data: universe
      })
      console.log(`  ✅ Created universe: ${universe.name}`)
    }
    
    console.log('🎭 Creating characters...')
    // Create characters
    for (const character of SAMPLE_CHARACTERS) {
      const universe = await prisma.universe.findUnique({
        where: { slug: character.universeSlug }
      })
      
      if (universe) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { universeSlug, ...characterData } = character
        await prisma.character.create({
          data: {
            ...characterData,
            universeId: universe.id
          }
        })
        console.log(`  ✅ Created character: ${character.name}`)
      }
    }
    
    console.log('🎉 Database seeded successfully!')
    console.log(`
📊 Created:
  - ${SAMPLE_UNIVERSES.length} universes
  - ${SAMPLE_CHARACTERS.length} characters
  
🚀 Ready to test:
  - Visit http://localhost:3001
  - Character images will auto-load via remote image system
  - Demo authentication available at /auth/signin
`)
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase()
}

export { seedDatabase }
