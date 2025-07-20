#!/bin/bash

echo "🚀 Deploying CharacterVerse..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Generate Prisma client
echo "⚡ Generating Prisma client..."
npx prisma generate

# Run database migrations (production)
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "⚠️ Migration failed, but continuing..."
fi

# Seed database (optional)
read -p "🌱 Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

echo "✅ Deployment preparation complete!"
echo "📋 Next steps:"
echo "   1. Push to your git repository"
echo "   2. Configure environment variables on your hosting platform"
echo "   3. Deploy from your hosting platform dashboard"
