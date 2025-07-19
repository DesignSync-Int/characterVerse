# Vercel Deployment Guide

## 1. Install Vercel CLI
npm install -g vercel

## 2. Login to Vercel
vercel login

## 3. Deploy from project root
vercel

## 4. Set up environment variables in Vercel dashboard:
# - DATABASE_URL (Vercel Postgres)
# - NEXTAUTH_URL (your domain)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)

## 5. Configure production database
# Update prisma/schema.prisma for production:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

## 6. Run production migration
npx prisma migrate deploy
npx prisma db seed
