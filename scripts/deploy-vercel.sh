#!/bin/bash

echo "🔵 Vercel Production Deployment for CharacterVerse"
echo "================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo ""
echo "📋 Pre-deployment checklist:"

# Check if build works
echo "🔨 Testing production build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi
echo "✅ Build successful"

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Ready for production deployment'"
    echo "   git push origin main"
    echo ""
    read -p "Do you want to commit and push now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Ready for production deployment"
        git push origin main
        echo "✅ Changes committed and pushed"
    else
        echo "❌ Please commit your changes before deploying"
        exit 1
    fi
else
    echo "✅ All changes committed"
fi

echo ""
echo "🔑 Environment Variables Setup:"
echo ""
echo "You'll need to add these environment variables in Vercel Dashboard:"
echo "👉 https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
echo ""

echo "🔴 REQUIRED Variables:"
echo "DATABASE_URL=\"postgresql://...\" (Get from Vercel Postgres)"
echo "NEXTAUTH_URL=\"https://your-app.vercel.app\""
echo "NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\""
echo ""

echo "🟡 OPTIONAL Variables (for better images):"
echo "UNSPLASH_ACCESS_KEY=\"your-unsplash-key\""
echo "PIXABAY_API_KEY=\"your-pixabay-key\""
echo "PEXELS_API_KEY=\"your-pexels-key\""
echo ""

echo "🟢 OPTIONAL Variables (for authentication):"
echo "GOOGLE_CLIENT_ID=\"your-google-client-id\""
echo "GOOGLE_CLIENT_SECRET=\"your-google-client-secret\""
echo "GITHUB_ID=\"your-github-id\""
echo "GITHUB_SECRET=\"your-github-secret\""
echo ""

echo "🚀 Deployment Steps:"
echo ""
echo "1. 📱 Go to Vercel:"
echo "   👉 https://vercel.com/new"
echo ""
echo "2. 📂 Import Repository:"
echo "   - Connect GitHub"
echo "   - Select: $(git remote get-url origin)"
echo "   - Framework: Next.js (auto-detected)"
echo ""
echo "3. 🗄️ Setup Database:"
echo "   - Go to Storage tab"
echo "   - Create → Postgres"
echo "   - Copy connection string to DATABASE_URL"
echo ""
echo "4. ⚙️ Add Environment Variables:"
echo "   - Use the variables listed above"
echo "   - Copy .env.vercel for reference"
echo ""
echo "5. 🚀 Deploy:"
echo "   - Click Deploy"
echo "   - Wait for build completion (~2-5 minutes)"
echo ""
echo "6. 🗄️ Initialize Database:"
echo "   - Go to Functions tab → your-app → View Function Logs"
echo "   - Or use Vercel CLI: vercel env pull && npx prisma migrate deploy"
echo ""

echo "📚 Additional Resources:"
echo "- 📖 Full guide: docs/deployment-guide.md"
echo "- 🔧 Config reference: .env.vercel"
echo "- 🆘 Troubleshooting: Check build logs in Vercel dashboard"
echo ""

echo "🎯 After deployment, your app will be live at:"
echo "   https://your-app.vercel.app"
echo ""

echo "✨ Pro Tips:"
echo "- Set up custom domain in Vercel dashboard"
echo "- Enable Vercel Analytics for insights"
echo "- Monitor performance in Vercel Speed Insights"
echo "- Set up Vercel Cron jobs for data updates"

echo ""
echo "🎉 Ready to deploy! Good luck!"
