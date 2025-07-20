#!/usr/bin/env node

/**
 * Update Character Images Script
 * Updates all characters with legal, real images from TMDB and Wikimedia
 */

import { LegalImageService } from '../src/lib/legal-image-service.js'

async function updateCharacterImages() {
  console.log('🖼️  Starting character image updates...')
  console.log('This script will find real, legal images for your characters')
  console.log('Sources: TMDB (movies/TV), Wikimedia (public domain)')
  console.log('')

  try {
    const stats = await LegalImageService.updateAllCharacterImages()
    
    console.log('\n✅ Character image update complete!')
    console.log(`📊 Results:`)
    console.log(`   - Updated: ${stats.updated} characters`)
    console.log(`   - Skipped: ${stats.skipped} characters`)
    console.log(`   - Failed: ${stats.failed} characters`)
    
    if (stats.updated > 0) {
      console.log('\n🎉 Successfully found real images for characters!')
      console.log('Check your app to see the new images.')
    }
    
    if (stats.failed > 0) {
      console.log('\n⚠️  Some characters could not be updated.')
      console.log('This is normal for fictional characters without movie/TV appearances.')
    }
    
  } catch (error) {
    console.error('❌ Error updating character images:', error)
    process.exit(1)
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  updateCharacterImages()
}

export { updateCharacterImages }
