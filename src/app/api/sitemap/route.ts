import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import config from '@/lib/config'

export async function GET() {
  try {
    // Get all characters and universes for sitemap
    const [characters, universes] = await Promise.all([
      prisma.character.findMany({
        select: { slug: true, updatedAt: true },
        where: { status: 'ACTIVE' },
      }),
      prisma.universe.findMany({
        select: { slug: true, updatedAt: true },
      }),
    ])

    const baseUrl = config.app.url

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home page -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Characters page -->
  <url>
    <loc>${baseUrl}/characters</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Universe pages -->
  <url>
    <loc>${baseUrl}/universes</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Rankings page -->
  <url>
    <loc>${baseUrl}/rankings</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Character detail pages -->
  ${characters
    .map(
      (character) => `
  <url>
    <loc>${baseUrl}/characters/${character.slug}</loc>
    <lastmod>${character.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
  
  <!-- Universe detail pages -->
  ${universes
    .map(
      (universe) => `
  <url>
    <loc>${baseUrl}/universes/${universe.slug}</loc>
    <lastmod>${universe.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
