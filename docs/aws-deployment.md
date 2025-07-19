# AWS Deployment Architecture

## Option A: AWS Amplify (Easiest)
```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
amplify publish
```

## Option B: ECS + RDS (Production)
```yaml
# docker-compose.yml for AWS ECS
version: '3.8'
services:
  characterverse:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${RDS_DATABASE_URL}
      - NEXTAUTH_SECRET=${SECRET}
    depends_on:
      - postgres
      
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=characterverse
      - POSTGRES_PASSWORD=${DB_PASSWORD}
```

## AWS Resources Needed:
- **ECS Fargate**: Container hosting
- **RDS PostgreSQL**: Database
- **CloudFront**: CDN
- **Route 53**: DNS
- **Certificate Manager**: SSL

## Estimated Cost:
- Small: $50-100/month
- Medium: $200-500/month
- Large: $1000+/month
