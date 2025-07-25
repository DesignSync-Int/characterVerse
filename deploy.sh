#!/bin/bash

# Render.com deployment script
# This script handles the database schema change from SQLite to PostgreSQL

echo "🚀 Starting Render deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Set the schema to PostgreSQL for production
echo "🔧 Configuring for PostgreSQL..."
sed -i 's/provider = "sqlite"/provider = "postgresql"/g' prisma/schema.prisma

# Generate Prisma client
echo "🔨 Generating Prisma client..."
npx prisma generate

# Run database migrations (will create tables in PostgreSQL)
echo "🗄️ Running database migrations..."
npx prisma db push --accept-data-loss

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Deployment complete!"
