# CharacterVerse Deployment Guide

## 🚀 Deployment Options

### 1. **Vercel (Recommended)** - Zero Configuration
### 2. **Render** - Excellent Free Tier with Database
### 3. **Netlify** - Great Alternative  
### 4. **Railway** - Includes Database
### 5. **DigitalOcean App Platform** - Professional
### 6. **AWS/Google Cloud** - Enterprise

---

## 🔵 **1. Vercel Deployment (Easiest)**

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Step-by-Step Guide

#### A. Prepare Your Repository
```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repository and push
git remote add origin https://github.com/yourusername/characterverse.git
git branch -M main
git push -u origin main
```

#### B. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your CharacterVerse repository
5. Configure environment variables (see below)
6. Click "Deploy"

#### C. Environment Variables for Vercel
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```bash
# Database (use Vercel Postgres or external)
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id" 
GITHUB_SECRET="your-github-secret"

# Commercial-Safe Image APIs
UNSPLASH_ACCESS_KEY="your-unsplash-key"
PIXABAY_API_KEY="your-pixabay-key"
PEXELS_API_KEY="your-pexels-key"

# AI Features (optional)
OPENAI_API_KEY="your-openai-key"
```

#### D. Database Setup for Vercel
**Option 1: Vercel Postgres (Recommended)**
1. In Vercel Dashboard → Storage → Create Database
2. Select "Postgres"
3. Copy the connection string to `DATABASE_URL`

**Option 2: External Database**
- Use [Supabase](https://supabase.com) (free tier)
- Use [PlanetScale](https://planetscale.com) (free tier)
- Use [Neon](https://neon.tech) (free tier)

#### E. Deploy Database Schema
```bash
# After deployment, run migrations
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

---

## � **2. Render Deployment (Great Free Tier)**

### Prerequisites
- GitHub account
- Render account (generous free tier)

### Step-by-Step Guide

#### A. Prepare Your Repository
```bash
# 1. Ensure your code is on GitHub
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

#### B. Create Database on Render
1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New" → "PostgreSQL"
4. Configure database:
   - Name: `characterverse-db`
   - Database: `characterverse`
   - User: `characterverse_user`
   - Region: Choose closest to you
5. Click "Create Database"
6. Copy the **External Database URL** (starts with `postgresql://`)

#### C. Deploy Web Service
1. In Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: `characterverse`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18`

#### D. Environment Variables for Render
Add these in Render Dashboard → Web Service → Environment:

```bash
# Database (use your Render Postgres URL)
DATABASE_URL=postgresql://characterverse_user:password@host/characterverse

# NextAuth.js
NEXTAUTH_URL=https://characterverse.onrender.com
NEXTAUTH_SECRET=your-super-secret-key-at-least-32-chars

# Commercial-Safe Image APIs (optional)
UNSPLASH_ACCESS_KEY=your-unsplash-key
PIXABAY_API_KEY=your-pixabay-key
PEXELS_API_KEY=your-pexels-key

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# AI Features (optional)
OPENAI_API_KEY=your-openai-key

# Node Environment
NODE_ENV=production
```

#### E. Deploy Database Schema
After first deployment, run migrations:

1. In Render Dashboard → Web Service → Shell
2. Run commands:
```bash
npx prisma migrate deploy
npx prisma db seed
```

**Or use Render's Deploy Hooks:**
Add to your `package.json`:
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "postbuild": "prisma generate",
    "render-postbuild": "npx prisma migrate deploy && npx prisma db seed"
  }
}
```

#### F. Custom Build Configuration
Create `render.yaml` in project root for advanced config:

```yaml
services:
  - type: web
    name: characterverse
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: characterverse-db
          property: connectionString
    
databases:
  - name: characterverse-db
    plan: free
    databaseName: characterverse
    user: characterverse_user
```

### 🎯 **Render Advantages**
- **Free Tier**: 750 hours/month (enough for personal projects)
- **Free Database**: PostgreSQL with 1GB storage
- **Auto-deploy**: Deploys on git push
- **Custom domains**: Free SSL certificates
- **No cold starts**: Unlike some competitors
- **Great for teams**: Built-in collaboration

---

## �🟡 **3. Netlify Deployment**

### Step-by-Step Guide

#### A. Prepare for Netlify
1. Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

#### B. Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables (same as Vercel)
5. Deploy

#### C. Database for Netlify
Use external database (Supabase, PlanetScale, or Neon)

---

## 🟢 **4. Railway Deployment (Includes Database)**

### Step-by-Step Guide

#### A. Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add PostgreSQL database service
4. Configure environment variables

#### B. Railway Environment Variables
Railway auto-configures `DATABASE_URL`. Add others:

```bash
# NextAuth.js
NEXTAUTH_URL="https://your-app.railway.app"
NEXTAUTH_SECRET="your-secret-key"

# Other APIs (same as above)
```

#### C. Deploy
Railway automatically builds and deploys on git push.

---

## 🔴 **5. DigitalOcean App Platform**

### Step-by-Step Guide

#### A. Create App Spec
Create `.do/app.yaml`:

```yaml
name: characterverse
services:
- name: web
  source_dir: /
  github:
    repo: yourusername/characterverse
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production

databases:
- name: characterverse-db
  engine: PG
  version: "13"
```

#### B. Deploy
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create App from GitHub
3. Configure environment variables
4. Deploy

---

## ⚙️ **Pre-Deployment Checklist**

### 1. **Environment Variables Setup**
```bash
# Copy example file
cp .env.example .env.production

# Fill in production values
# Never commit .env files!
```

### 2. **Database Migration**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

### 3. **Build Test**
```bash
# Test production build locally
npm run build
npm start
```

### 4. **Security Checklist**
- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Correct `NEXTAUTH_URL` for production
- [ ] API keys are secure
- [ ] Database connection is encrypted
- [ ] No sensitive data in code

---

## 🗄️ **Database Options**

### Free Tier Options
1. **Render** - 750 hours/month, 1GB Postgres database
2. **Vercel Postgres** - 60 hours compute/month
3. **Supabase** - 500MB, 2 concurrent connections
4. **PlanetScale** - 1 database, 1 billion reads
5. **Neon** - 3 databases, 3GB storage

### Paid Options
1. **AWS RDS** - Scalable, professional
2. **Google Cloud SQL** - Enterprise features
3. **MongoDB Atlas** - NoSQL option

---

## 🔧 **Production Optimizations**

### 1. **Update package.json**
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "postbuild": "prisma generate"
  }
}
```

### 2. **Add Production Config**
Create `next.config.production.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  images: {
    // Your existing image config
  }
}

module.exports = nextConfig
```

### 3. **Environment-specific Settings**
```javascript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  database: {
    url: process.env.DATABASE_URL
  }
}
```

---

## 📊 **Deployment Commands**

### Quick Deploy Script
Create `scripts/deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying CharacterVerse..."

# Build the application
echo "📦 Building application..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "⚡ Generating Prisma client..."
npx prisma generate

# Seed database (if needed)
echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Deployment ready!"
```

### Make it executable
```bash
chmod +x scripts/deploy.sh
```

---

## 🎯 **Recommended Deployment Flow**

### For Beginners: **Vercel**
- Zero configuration
- Free tier
- Automatic deployments
- Built-in database option

### For Free Hosting: **Render**
- Generous free tier (750 hours/month)
- Includes free PostgreSQL database
- No cold starts
- Great performance

### For Teams: **Railway**
- Includes database
- Simple pricing
- Good collaboration features

### For Enterprise: **DigitalOcean/AWS**
- Full control
- Scalable infrastructure
- Professional support

---

## 🚨 **Common Issues & Solutions**

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database (development only!)
npx prisma migrate reset
```

### Environment Variable Issues
- Check spelling and case sensitivity
- Ensure no trailing spaces
- Use quotes for complex values

---

## 📈 **Post-Deployment**

### 1. **Monitor Performance**
- Set up error tracking (Sentry)
- Monitor database performance
- Check API response times

### 2. **Set up CI/CD**
- Automatic deployments on git push
- Run tests before deployment
- Database backup automation

### 3. **Analytics**
- Google Analytics
- User behavior tracking
- Performance monitoring

Would you like me to help you deploy to a specific platform or set up any of these configurations?
