import { NextResponse } from 'next/server'
import config from '@/lib/config'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${config.app.url}/sitemap.xml

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /auth/

# Allow important pages
Allow: /
Allow: /characters
Allow: /universes  
Allow: /rankings
Allow: /characters/*
Allow: /universes/*`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}
