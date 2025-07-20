/**
 * Production Configuration for CharacterVerse
 * Optimized for Vercel deployment
 */

export const config = {
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Application settings
  app: {
    name: 'CharacterVerse',
    version: '1.0.0',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    description: 'Character rating and ranking platform for fictional characters',
  },

  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    // Connection pooling for production
    maxConnections: process.env.NODE_ENV === 'production' ? 5 : 1,
  },

  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      },
    },
  },

  // Image services (commercial-safe)
  images: {
    unsplash: {
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
      enabled: !!process.env.UNSPLASH_ACCESS_KEY,
    },
    pixabay: {
      apiKey: process.env.PIXABAY_API_KEY,
      enabled: !!process.env.PIXABAY_API_KEY,
    },
    pexels: {
      apiKey: process.env.PEXELS_API_KEY,
      enabled: !!process.env.PEXELS_API_KEY,
    },
  },

  // AI features
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      enabled: !!process.env.OPENAI_API_KEY,
    },
  },

  // Performance settings
  performance: {
    // Cache durations (in seconds)
    cacheTTL: {
      characters: 3600, // 1 hour
      images: 86400,    // 24 hours
      static: 31536000, // 1 year
    },
    
    // Rate limiting
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: process.env.NODE_ENV === 'production' ? 100 : 1000, // requests per window
    },
  },

  // Feature flags
  features: {
    authentication: true,
    aiRecommendations: !!process.env.OPENAI_API_KEY,
    commercialImages: true,
    userLists: true,
    reviews: true,
  },

  // Analytics (if needed)
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    enabled: !!process.env.GOOGLE_ANALYTICS_ID && process.env.NODE_ENV === 'production',
  },

  // Error reporting
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN,
    enabled: !!process.env.SENTRY_DSN && process.env.NODE_ENV === 'production',
  },
}

export default config
