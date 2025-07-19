# GitHub + Vercel Automatic Deployment

## Setup Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial CharacterVerse deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Auto-detects Next.js configuration
   - Deploys automatically on every push

## Environment Variables to Set in Vercel:
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=optional
GOOGLE_CLIENT_SECRET=optional
GITHUB_ID=optional
GITHUB_SECRET=optional
```

## Production Database Setup:
```bash
# Use Vercel's PostgreSQL
vercel postgres create characterverse-db
vercel env pull .env.local
npx prisma migrate deploy
```
