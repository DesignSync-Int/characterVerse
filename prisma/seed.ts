import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample universes
  const universes = await Promise.all([
    prisma.universe.create({
      data: {
        name: 'Marvel Comics',
        slug: 'marvel-comics',
        description: 'The Marvel Universe featuring superheroes like Spider-Man, Iron Man, and the Avengers.',
        type: 'COMICS',
        imageUrl: '/universes/marvel.jpg'
      }
    }),
    prisma.universe.create({
      data: {
        name: 'DC Comics',
        slug: 'dc-comics',
        description: 'Home to Superman, Batman, Wonder Woman, and the Justice League.',
        type: 'COMICS',
        imageUrl: '/universes/dc.jpg'
      }
    }),
    prisma.universe.create({
      data: {
        name: 'Dragon Ball',
        slug: 'dragon-ball',
        description: 'The epic adventures of Goku and friends in Akira Toriyama\'s legendary anime.',
        type: 'ANIME',
        imageUrl: '/universes/dragon-ball.jpg'
      }
    }),
    prisma.universe.create({
      data: {
        name: 'Naruto',
        slug: 'naruto',
        description: 'Follow Naruto Uzumaki\'s journey to become the greatest ninja.',
        type: 'ANIME',
        imageUrl: '/universes/naruto.jpg'
      }
    }),
    prisma.universe.create({
      data: {
        name: 'One Piece',
        slug: 'one-piece',
        description: 'Join Monkey D. Luffy and his crew in their quest for the ultimate treasure.',
        type: 'ANIME',
        imageUrl: '/universes/one-piece.jpg'
      }
    })
  ])

  console.log('✅ Created universes')

  // Create sample characters
  const characters = await Promise.all([
    // Marvel Characters
    prisma.character.create({
      data: {
        name: 'Spider-Man',
        slug: 'spider-man',
        description: 'Peter Parker, a high school student bitten by a radioactive spider, gaining spider-like abilities.',
        universeId: universes[0].id,
        species: 'Human (Enhanced)',
        occupation: 'Student, Photographer, Superhero',
        powers: JSON.stringify(['Web-slinging', 'Wall-crawling', 'Spider-sense', 'Enhanced strength', 'Enhanced agility']),
        aliases: JSON.stringify(['Peter Parker', 'Web-slinger', 'Your Friendly Neighborhood Spider-Man']),
        firstAppearance: 'Amazing Fantasy #15 (1962)',
        creator: 'Stan Lee, Steve Ditko',
        avgPersonality: 8.5,
        avgPowers: 7.8,
        avgWeaknesses: 6.2,
        avgOrigin: 9.1,
        avgImpact: 9.3,
        overallRating: 8.2,
        totalRatings: 1250
      }
    }),
    // DC Characters  
    prisma.character.create({
      data: {
        name: 'Batman',
        slug: 'batman',
        description: 'Bruce Wayne, a billionaire who fights crime in Gotham City using his intellect, martial arts, and high-tech equipment.',
        universeId: universes[1].id,
        species: 'Human',
        occupation: 'Billionaire, Vigilante, CEO',
        powers: JSON.stringify(['Peak human condition', 'Master detective', 'Martial arts expert', 'Advanced technology']),
        aliases: JSON.stringify(['Bruce Wayne', 'The Dark Knight', 'The Caped Crusader', 'The World\'s Greatest Detective']),
        firstAppearance: 'Detective Comics #27 (1939)',
        creator: 'Bob Kane, Bill Finger',
        avgPersonality: 8.9,
        avgPowers: 8.1,
        avgWeaknesses: 7.3,
        avgOrigin: 9.5,
        avgImpact: 9.7,
        overallRating: 8.7,
        totalRatings: 1876
      }
    }),
    // Anime Characters
    prisma.character.create({
      data: {
        name: 'Goku',
        slug: 'goku',
        description: 'Son Goku, a Saiyan warrior raised on Earth who protects the planet from various threats.',
        universeId: universes[2].id,
        species: 'Saiyan',
        occupation: 'Martial Artist, Farmer',
        powers: JSON.stringify(['Super Saiyan transformations', 'Ki manipulation', 'Flight', 'Instant transmission', 'Ultra Instinct']),
        aliases: JSON.stringify(['Son Goku', 'Kakarot']),
        firstAppearance: 'Dragon Ball Chapter 1 (1984)',
        creator: 'Akira Toriyama',
        avgPersonality: 9.0,
        avgPowers: 9.8,
        avgWeaknesses: 5.5,
        avgOrigin: 8.7,
        avgImpact: 9.5,
        overallRating: 8.5,
        totalRatings: 2180
      }
    }),
    prisma.character.create({
      data: {
        name: 'Naruto Uzumaki',
        slug: 'naruto-uzumaki',
        description: 'A young ninja with dreams of becoming the Hokage and gaining recognition from his peers.',
        universeId: universes[3].id,
        species: 'Human (Jinchūriki)',
        occupation: 'Ninja, Hokage',
        powers: JSON.stringify(['Nine-Tails chakra', 'Shadow Clone Jutsu', 'Rasengan', 'Sage Mode', 'Six Paths Sage Mode']),
        aliases: JSON.stringify(['Naruto', 'Seventh Hokage', 'Child of Prophecy']),
        firstAppearance: 'Naruto Chapter 1 (1999)',
        creator: 'Masashi Kishimoto',
        avgPersonality: 8.8,
        avgPowers: 8.9,
        avgWeaknesses: 6.8,
        avgOrigin: 8.9,
        avgImpact: 9.1,
        overallRating: 8.5,
        totalRatings: 1654
      }
    }),
    prisma.character.create({
      data: {
        name: 'Monkey D. Luffy',
        slug: 'monkey-d-luffy',
        description: 'A pirate captain with rubber powers on a quest to become the Pirate King.',
        universeId: universes[4].id,
        species: 'Human',
        occupation: 'Pirate Captain',
        powers: JSON.stringify(['Rubber body', 'Gear transformations', 'Conqueror\'s Haki', 'Armament Haki', 'Observation Haki']),
        aliases: JSON.stringify(['Luffy', 'Straw Hat', 'Straw Hat Luffy']),
        firstAppearance: 'One Piece Chapter 1 (1997)',
        creator: 'Eiichiro Oda',
        avgPersonality: 9.2,
        avgPowers: 8.7,
        avgWeaknesses: 7.1,
        avgOrigin: 8.5,
        avgImpact: 9.0,
        overallRating: 8.5,
        totalRatings: 1432
      }
    }),
    prisma.character.create({
      data: {
        name: 'Wonder Woman',
        slug: 'wonder-woman',
        description: 'Diana Prince, an Amazonian warrior princess and founding member of the Justice League.',
        universeId: universes[1].id,
        species: 'Amazon',
        occupation: 'Superhero, Ambassador',
        powers: JSON.stringify(['Super strength', 'Flight', 'Lasso of Truth', 'Indestructible bracelets', 'Divine powers']),
        aliases: JSON.stringify(['Diana Prince', 'Princess Diana', 'Diana of Themyscira']),
        firstAppearance: 'All Star Comics #8 (1941)',
        creator: 'William Moulton Marston',
        avgPersonality: 8.7,
        avgPowers: 8.9,
        avgWeaknesses: 6.5,
        avgOrigin: 9.0,
        avgImpact: 8.8,
        overallRating: 8.4,
        totalRatings: 987
      }
    })
  ])

  console.log('✅ Created characters')

  // Create a sample user
  const sampleUser = await prisma.user.create({
    data: {
      email: 'demo@characterverse.app',
      name: 'Demo User',
      username: 'demouser',
      bio: 'A passionate fan of fictional characters across all universes!'
    }
  })

  console.log('✅ Created sample user')

  // Create sample ratings
  await Promise.all([
    prisma.rating.create({
      data: {
        userId: sampleUser.id,
        characterId: characters[0].id, // Spider-Man
        personality: 9,
        powers: 8,
        weaknesses: 6,
        origin: 9,
        impact: 9,
        overall: 8.2
      }
    }),
    prisma.rating.create({
      data: {
        userId: sampleUser.id,
        characterId: characters[1].id, // Batman
        personality: 9,
        powers: 8,
        weaknesses: 7,
        origin: 10,
        impact: 10,
        overall: 8.8
      }
    }),
    prisma.rating.create({
      data: {
        userId: sampleUser.id,
        characterId: characters[2].id, // Goku
        personality: 9,
        powers: 10,
        weaknesses: 5,
        origin: 8,
        impact: 10,
        overall: 8.4
      }
    })
  ])

  console.log('✅ Created sample ratings')

  // Create sample reviews
  await Promise.all([
    prisma.review.create({
      data: {
        userId: sampleUser.id,
        characterId: characters[0].id,
        title: 'The Perfect Balance of Power and Responsibility',
        content: 'Spider-Man represents everything great about superhero characters. His relatable struggles as Peter Parker combined with his unwavering commitment to doing the right thing makes him timeless. The character development over decades has been exceptional.',
        isRecommended: true,
        helpfulCount: 15
      }
    }),
    prisma.review.create({
      data: {
        userId: sampleUser.id,
        characterId: characters[2].id,
        title: 'The Ultimate Shonen Protagonist',
        content: 'Goku\'s pure-hearted nature and endless desire to become stronger is incredibly inspiring. His character has influenced countless other anime protagonists. While some may find his naivety frustrating, it\'s part of what makes him special.',
        isRecommended: true,
        helpfulCount: 23
      }
    })
  ])

  console.log('✅ Created sample reviews')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
