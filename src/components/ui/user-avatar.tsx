'use client'

import { useSession } from 'next-auth/react'
import { CharacterImageService } from '@/lib/image-service'
import Image from 'next/image'
import { User } from 'lucide-react'

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16'
}

export function UserAvatar({ size = 'md', showName = false, className = '' }: UserAvatarProps) {
  const { data: session } = useSession()
  
  if (!session?.user) {
    return null
  }

  // Generate avatar URL if user doesn't have one
  const avatarUrl = session.user.image || CharacterImageService.getCharacterImageUrl({
    name: session.user.name || session.user.email || 'User',
    universe: 'CharacterVerse'
  }, 150)

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeMap[size]} rounded-full overflow-hidden bg-slate-200 flex items-center justify-center`}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={session.user.name || 'User avatar'}
            width={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
            height={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <User className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'} text-slate-600`} />
        )}
      </div>
      
      {showName && (
        <span className="text-sm font-medium text-slate-900">
          {session.user.name || session.user.email}
        </span>
      )}
    </div>
  )
}
