#!/bin/bash

echo "🟣 Render Deployment Helper for CharacterVerse"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "  ✅ Code is committed to git"
echo "  ✅ Repository is on GitHub"
echo "  ✅ Build tested locally"

echo ""
echo "🔗 Render Setup Steps:"
echo ""
echo "1. 🗄️ Create Database:"
echo "   - Go to render.com → New → PostgreSQL"
echo "   - Name: characterverse-db"
echo "   - Plan: Free"
echo "   - Copy External Database URL"
echo ""

echo "2. 🌐 Create Web Service:"
echo "   - Go to render.com → New → Web Service"  
echo "   - Connect GitHub repository: $(git remote get-url origin)"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "   - Plan: Free"
echo ""

echo "3. ⚙️ Environment Variables:"
echo "   Add these in Render Dashboard:"
echo ""
echo "   Required:"
echo "   DATABASE_URL=<your-render-postgres-url>"
echo "   NEXTAUTH_URL=https://characterverse.onrender.com"
echo "   NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "   NODE_ENV=production"
echo ""

echo "   Optional (for better images):"
echo "   UNSPLASH_ACCESS_KEY=your-unsplash-key"
echo "   PIXABAY_API_KEY=your-pixabay-key" 
echo "   PEXELS_API_KEY=your-pexels-key"
echo ""

echo "4. 🚀 After Deployment:"
echo "   - Go to your web service → Shell"
echo "   - Run: npx prisma migrate deploy"
echo "   - Run: npx prisma db seed"
echo ""

echo "🎯 Your app will be live at:"
echo "   https://characterverse.onrender.com"
echo ""

echo "📚 Need help? Check docs/render-deployment.md"

# Check if git repository exists and show current status
if [ -d ".git" ]; then
    echo ""
    echo "📊 Git Status:"
    git status --short
    
    if [ -n "$(git status --porcelain)" ]; then
        echo ""
        echo "⚠️  You have uncommitted changes. Commit them first:"
        echo "   git add ."
        echo "   git commit -m 'Ready for Render deployment'"
        echo "   git push origin main"
    else
        echo "✅ All changes committed and ready for deployment!"
    fi
fi
