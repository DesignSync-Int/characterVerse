# 🟣 Render Deployment Guide for CharacterVerse

## Why Render?
- **Generous Free Tier**: 750 hours/month (enough for personal projects)
- **Free Database**: 1GB PostgreSQL included
- **No Cold Starts**: Your app stays warm
- **Auto-Deploy**: Deploy on git push
- **Easy Setup**: Simple dashboard interface

---

## 🚀 Quick Deployment (10 minutes)

### Step 1: Prepare Repository
```bash
# Ensure your code is on GitHub
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Database
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Dashboard → "New" → "PostgreSQL"
3. Settings:
   - **Name**: `characterverse-db`
   - **Database**: `characterverse` 
   - **User**: `characterverse_user`
   - **Plan**: Free
4. Click "Create Database"
5. **Copy the External Database URL** (you'll need this)

### Step 3: Deploy Web Service
1. Dashboard → "New" → "Web Service"
2. Connect your `characterverse` repository
3. Settings:
   - **Name**: `characterverse`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 4: Environment Variables
In the web service settings, add these environment variables:

#### Required Variables
```bash
DATABASE_URL=postgresql://characterverse_user:password@host/characterverse
NEXTAUTH_URL=https://characterverse.onrender.com
NEXTAUTH_SECRET=your-super-secret-key-at-least-32-characters-long
NODE_ENV=production
```

#### Optional Variables (for better images)
```bash
UNSPLASH_ACCESS_KEY=your-unsplash-key
PIXABAY_API_KEY=your-pixabay-key
PEXELS_API_KEY=your-pexels-key
```

#### Optional Variables (for authentication)
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. First deployment takes 5-10 minutes

### Step 6: Initialize Database
After first deployment:
1. Go to your web service dashboard
2. Click "Shell" (console access)
3. Run:
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## 🔧 Advanced Configuration

### Automatic Database Setup
Add this to your `package.json` to auto-run migrations:

```json
{
  "scripts": {
    "render-postbuild": "npx prisma migrate deploy && npx prisma db seed"
  }
}
```

Render will automatically run this after each build.

### Custom Domain
1. In your web service → Settings → Custom Domains
2. Add your domain (e.g., `characterverse.com`)
3. Update DNS records as shown
4. Update `NEXTAUTH_URL` to your custom domain

### Environment-specific Builds
Create different services for staging/production:

```bash
# Production service
NEXTAUTH_URL=https://characterverse.com

# Staging service  
NEXTAUTH_URL=https://staging-characterverse.onrender.com
```

---

## 💰 **Render Pricing**

### Free Tier (Perfect for personal projects)
- **Web Service**: 750 hours/month
- **Database**: 1GB PostgreSQL
- **Bandwidth**: 100GB/month
- **Custom Domains**: ✅ Included
- **SSL**: ✅ Automatic

### Paid Plans (For production)
- **Starter**: $7/month - No sleep, more resources
- **Standard**: $25/month - Autoscaling, more CPU/RAM
- **Pro**: $85/month - Priority support, advanced features

---

## 📊 **Performance Tips**

### Keep Service Awake (Free Tier)
Free services "sleep" after 15 minutes of inactivity. To keep awake:

1. **UptimeRobot**: Free service to ping your app every 5 minutes
2. **Cron job**: Set up a simple health check
3. **Upgrade to paid**: $7/month removes sleep entirely

### Optimize Build Time
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start", 
    "render-build": "npm ci --only=production && npm run build"
  }
}
```

### Database Optimization
- Use connection pooling for production
- Index frequently queried fields
- Monitor query performance in Render dashboard

---

## 🚨 **Common Issues & Solutions**

### Build Timeouts
```bash
# In render.yaml, increase build timeout
services:
  - type: web
    buildCommand: npm install && npm run build
    plan: free
    # Builds timeout after 10 minutes on free tier
```

### Database Connection Issues
1. Check `DATABASE_URL` format
2. Ensure database is in same region as web service
3. Test connection in Shell:
```bash
npx prisma db pull
```

### Environment Variables Not Working
- Check for typos and extra spaces
- Ensure values are saved (click "Save Changes")
- Restart service after adding variables

### Prisma Issues
```bash
# If migrations fail, reset and try again
npx prisma migrate reset --force
npx prisma migrate deploy
```

---

## 🔄 **Deployment Workflow**

### Development to Production
1. **Develop locally**: `npm run dev`
2. **Test build**: `npm run build`
3. **Commit changes**: `git commit -m "Feature: new functionality"`
4. **Push to GitHub**: `git push origin main`
5. **Auto-deploy**: Render automatically deploys
6. **Monitor**: Check deployment logs in dashboard

### Rollback Strategy
1. Go to Render Dashboard → Your Service → Deploys
2. Click on previous successful deployment
3. Click "Redeploy"

---

## 📈 **Monitoring & Maintenance**

### Built-in Monitoring
- **Metrics**: CPU, Memory, Response times
- **Logs**: Real-time application logs
- **Alerts**: Set up email notifications

### Health Checks
Render automatically checks `/` endpoint. For custom health check:

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

### Database Backups
- **Free Tier**: No automatic backups
- **Paid Plans**: Daily automated backups
- **Manual Backup**: Use `pg_dump` in Shell

---

## 🎯 **Quick Commands Reference**

```bash
# Deploy preparation
npm run build && npm run lint

# Database operations (in Render Shell)
npx prisma migrate deploy
npx prisma db seed  
npx prisma studio

# View logs
# (Available in Render Dashboard → Logs)

# Environment check
node -e "console.log(process.env.DATABASE_URL)"
```

---

## 🆚 **Render vs Others**

| Feature | Render | Vercel | Railway | Netlify |
|---------|--------|--------|---------|---------|
| Free Tier | 750hrs/month | Hobby limits | $5/month | Limited |
| Database | 1GB included | Extra cost | Included | External |
| Cold Starts | No | No | No | Yes |
| Node.js Support | ✅ Full | ✅ Serverless | ✅ Full | ⚠️ Functions |
| Custom Domains | ✅ Free | ✅ Free | ✅ Free | ✅ Free |

**Render is ideal for**: Full-stack apps needing a database and consistent uptime on free tier.

---

## 🎉 **Success!**

Your CharacterVerse app should now be live at:
`https://characterverse.onrender.com`

### Next Steps:
1. Set up a custom domain
2. Configure authentication providers
3. Add image API keys for better character images
4. Set up monitoring and alerts
5. Consider upgrading to paid plan for production use

Need help? Check the [Render documentation](https://render.com/docs) or their community Discord!
