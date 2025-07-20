'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, Info } from 'lucide-react'
import { CharacterImageService, ImageSource } from '@/lib/image-service'

interface CharacterImageProps {
  character: {
    name: string
    imageUrl?: string | null
    tmdbId?: string | null
    wikimediaFile?: string | null
    universe?: string
    imageSource?: string | null
    imageLicense?: string | null
    imageAttribution?: string | null
  }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  priority?: boolean
  showAttribution?: boolean
  fallbackToGenerated?: boolean
}

const SIZES = {
  sm: { width: 80, height: 80, className: 'w-20 h-20' },
  md: { width: 160, height: 160, className: 'w-40 h-40' },
  lg: { width: 320, height: 320, className: 'w-80 h-80' },
  xl: { width: 480, height: 480, className: 'w-96 h-96' }
}

export function CharacterImage({ 
  character, 
  size = 'md', 
  className = '',
  priority = false,
  showAttribution = false,
  fallbackToGenerated = true
}: CharacterImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  
  const sizeConfig = SIZES[size]
  
  // Get optimized image URL
  const imageUrl = CharacterImageService.getCharacterImageUrl(character, sizeConfig.width)
  
  // Determine if this is a generated avatar
  const isGenerated = imageUrl.includes('dicebear.com') || imageUrl.includes('ui-avatars.com') || imageError || !character.imageUrl
  
  return (
    <div className={`relative ${sizeConfig.className} ${className} group`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-purple-200">
          <ImageIcon className="h-8 w-8 text-gray-400 animate-pulse" />
        </div>
      )}
      
      {/* Main image */}
      <Image
        src={imageUrl}
        alt={`${character.name} character image`}
        width={sizeConfig.width}
        height={sizeConfig.height}
        className={`rounded-lg object-cover shadow-lg border-2 transition-all duration-300 ${
          isGenerated 
            ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50' 
            : 'border-purple-300'
        } ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } group-hover:shadow-xl`}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
      />
      
      {/* Attribution overlay */}
      {showAttribution && (character.imageSource || isGenerated) && (
        <div 
          className="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          <div className="flex items-center justify-between">
            <span className="truncate">
              {isGenerated ? 'Generated Avatar' : character.imageSource}
            </span>
            <Info className="h-3 w-3 ml-1 flex-shrink-0" />
          </div>
        </div>
      )}
      
      {/* Image source indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
          isGenerated 
            ? 'bg-blue-500 text-white' 
            : character.imageLicense === 'CC/Public Domain'
            ? 'bg-green-500 text-white'
            : 'bg-orange-500 text-white'
        }`}>
          {isGenerated ? 'GEN' : character.imageLicense?.includes('CC') ? 'CC' : 'LIC'}
        </div>
      </div>
      
      {/* Detailed info popup */}
      {showInfo && (character.imageSource || isGenerated) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 text-sm z-50">
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Source:</span>
              <span className="ml-2 text-gray-600">
                {isGenerated ? 'DiceBear (Generated)' : character.imageSource}
              </span>
            </div>
            
            {character.imageLicense && !isGenerated && (
              <div>
                <span className="font-semibold text-gray-700">License:</span>
                <span className="ml-2 text-gray-600">{character.imageLicense}</span>
              </div>
            )}
            
            {character.imageAttribution && !isGenerated && (
              <div>
                <span className="font-semibold text-gray-700">Attribution:</span>
                <span className="ml-2 text-gray-600">{character.imageAttribution}</span>
              </div>
            )}
            
            {isGenerated && (
              <div className="text-gray-500 text-xs">
                This is a generated avatar created from the character name. 
                No copyright restrictions apply.
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowInfo(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Image selector component for choosing character images
 */
interface ImageSelectorProps {
  character: {
    id: string
    name: string
    universe?: string
  }
  onImageSelect: (imageData: {
    url: string
    source: string
    license: string
    attribution?: string
  }) => void
}

export function CharacterImageSelector({ character, onImageSelect }: ImageSelectorProps) {
  const [imageOptions, setImageOptions] = useState<{
    url: string
    source: string
    license: string
    attribution?: string
    width?: number
    height?: number
  }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const searchImages = async () => {
    setIsLoading(true)
    try {
      const options = await CharacterImageService.searchCharacterImages(
        character.name,
        character.universe || ''
      )
      setImageOptions(options)
    } catch (error) {
      console.error('Error searching images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageSelect = (option: {
    url: string
    source: string
    license: string
    attribution?: string
  }) => {
    setSelectedImage(option.url)
    onImageSelect({
      url: option.url,
      source: option.source,
      license: option.license,
      attribution: option.attribution
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Character Images</h3>
        <button
          onClick={searchImages}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search Images'}
        </button>
      </div>

      {imageOptions.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageOptions.map((option, index) => (
            <div
              key={index}
              className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                selectedImage === option.url
                  ? 'border-purple-500 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handleImageSelect(option)}
            >
              <Image
                src={option.url}
                alt={`${character.name} option ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-700">{option.source}</div>
                <div className="text-xs text-gray-500">{option.license}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
