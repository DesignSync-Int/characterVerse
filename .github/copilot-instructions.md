# CharacterVerse - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
CharacterVerse is a character rating and ranking platform for fictional characters across universes (comics, anime, movies, TV shows, games, mythology). Think IMDb for characters, enhanced with AI, gamification, and community interaction.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, React, TypeScript, TailwindCSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI GPT models for recommendations and descriptions
- **Search**: Vector search capabilities (Pinecone/FAISS)
- **PWA**: Progressive Web App capabilities
- **Styling**: TailwindCSS with custom component library

## Character Rating Categories
When working with character ratings, use these 5 core categories:
1. **Personality & Traits** - Character development, likability, complexity
2. **Powers & Abilities** - Strength, special abilities, combat skills
3. **Weaknesses & Flaws** - Vulnerabilities, character flaws, limitations
4. **Origin & Backstory** - Background story quality, origin complexity
5. **Role & Impact** - Importance to story, cultural impact, memorability

## Code Conventions
- Use TypeScript for all new files
- Follow React functional components with hooks
- Use Prisma for database operations
- Implement proper error handling and loading states
- Use consistent naming: PascalCase for components, camelCase for functions
- Prefer server components when possible, use client components only when needed
- Use proper SEO optimization with Next.js metadata API

## Project Structure
- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions, database client, AI integrations
- `/src/types` - TypeScript type definitions
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## AI Integration Guidelines
- Use OpenAI for character personality analysis and recommendations
- Implement vector search for character similarity matching
- Generate character descriptions while respecting copyright
- Focus on original content and fair use principles

## Framework Reusability
This project is designed to be reusable for other rating platforms:
- iStoreDB (grocery product reviews)
- Future verticals: books, gadgets, historical figures
- Keep core rating/review engine modular and configurable
