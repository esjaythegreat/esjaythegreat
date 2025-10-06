# Complete Setup Guide

## Initial Setup

### 1. Clone and Setup Environment

```bash
# Copy environment example
cp .env.example .env

# Generate secure secrets
openssl rand -base64 32  # Use for JWT_SECRET
openssl rand -base64 32  # Use for API_TOKEN_SALT
openssl rand -base64 32  # Use for ADMIN_JWT_SECRET
openssl rand -base64 32  # Use for APP_KEYS (comma-separated for 4 keys)
```

### 2. Configure Environment Variables

Edit `.env` and update:
- All password fields with secure passwords
- All secret keys with generated values
- Email settings if you want to use newsletter/contact features
- Update URLs for production deployment

### 3. Start Services

```bash
# Using Makefile
make build
make up

# Or using Docker Compose
docker-compose build
docker-compose up -d
```

### 4. Check Service Health

```bash
make status

# You should see:
# - postgres: healthy
# - strapi: running
# - frontend: running
```

### 5. Access Strapi Admin Panel

1. Open http://localhost:1337/admin
2. Create your first admin account
3. Complete the registration form

## Configure Strapi Content Types

### Albums Content Type

1. Go to Content-Type Builder → Create new collection type
2. Name: `album`
3. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required |
| slug | UID | Required, target field: title |
| excerpt | Text | - |
| content | Rich Text | Required |
| publishedDate | DateTime | Required |
| featuredImage | Media | Single, Images only |
| youtubeEmbedUrl | Text | - |

3. Save and wait for server restart

### Events Content Type

1. Create new collection type: `event`
2. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required |
| date | DateTime | Required |
| venue | Text | - |
| city | Text | - |
| ticketUrl | Text | - |
| description | Rich Text | - |

3. Save and wait for server restart

### Newsletter Subscribers Content Type

1. Create new collection type: `newsletter-subscriber`
2. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| email | Email | Required, Unique |
| subscribedAt | DateTime | Required |
| isActive | Boolean | Default: true |
| unsubscribeToken | UID | - |

3. Save and wait for server restart

### Contact Messages Content Type

1. Create new collection type: `contact-message`
2. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| name | Text | Required |
| email | Email | Required |
| subject | Text | - |
| message | Rich Text | Required |
| receivedAt | DateTime | Required |
| isRead | Boolean | Default: false |

3. Save and wait for server restart

## Configure Permissions

### Public Access (Important!)

1. Go to Settings → Users & Permissions → Roles → Public
2. Enable the following permissions:

**Album**
- ✅ find
- ✅ findOne

**Article**
- ✅ find
- ✅ findOne

**Event**
- ✅ find
- ✅ findOne

**Newsletter-subscriber**
- ✅ create

**Contact-message**
- ✅ create

3. Save changes

### Authenticated Access (Optional)

Configure if you need user authentication for your site.

## Add Sample Content

### Create Your First Album

1. Go to Content Manager → Album
2. Click "Create new entry"
3. Fill in the details:
   - Title: "Your Album Name"
   - Slug: (auto-generated)
   - Description: Album description
   - Release Date: Select date
   - Upload Cover Image
   - Add streaming links (Melon, Spotify, etc.)
4. Click Save
5. Click Publish

### Create Your First Article

1. Go to Content Manager → Article
2. Click "Create new entry"
3. Fill in:
   - Title: "Welcome to my blog"
   - Slug: (auto-generated)
   - Excerpt: Short preview
   - Content: Full article text
   - Published Date: Select date/time
   - Upload Featured Image (optional)
4. Save and Publish

### Create Your First Event

1. Go to Content Manager → Event
2. Click "Create new entry"
3. Fill in:
   - Title: "Live Performance"
   - Description: Event details
   - Event Date: Select date/time
   - Event Time: "19:00"
   - Venue: "Venue name"
   - Ticket URL: Link to ticket site
   - Upload Poster Image
4. Save and Publish

## Verify Frontend

1. Open http://localhost:3000
2. You should see:
   - ✅ Homepage with your profile
   - ✅ Music section with albums
   - ✅ Navigation menu
3. Click on an album - should show details
4. Go to /blog - should show articles
5. Go to /events - should show events
6. Test contact form
7. Test newsletter signup

## SEO Verification

### Check Meta Tags

1. View page source (Ctrl+U)
2. Look for:
   - `<title>` tags
   - `<meta name="description">` 
   - `<meta property="og:...">` (Open Graph)
   - `<meta name="twitter:...">` (Twitter Cards)
   - `<script type="application/ld+json">` (Structured Data)

### Test with Tools

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Lighthouse** (Chrome DevTools): Check SEO score

### Verify Sitemap

- Open http://localhost:3000/sitemap.xml
- Should list all pages

### Verify robots.txt

- Open http://localhost:3000/robots.txt
- Should show proper directives

## Production Deployment

### 1. Update Environment for Production

```bash
# In .env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_STRAPI_API_URL=https://api.yourdomain.com
```

### 2. Security Hardening

```bash
# Generate new production secrets
openssl rand -base64 32 > jwt_secret.txt
openssl rand -base64 32 > api_token_salt.txt
openssl rand -base64 32 > admin_jwt_secret.txt
```

Update .env with these new values.

### 3. Database Backup Setup

Create a backup script `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker-compose exec -T postgres pg_dump -U strapi strapi > \
  $BACKUP_DIR/backup_$TIMESTAMP.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Add to crontab:
```bash
0 2 * * * /path/to/backup.sh
```

### 4. SSL/HTTPS Setup

Add nginx reverse proxy:

```yaml
# docker-compose.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - strapi
```

### 5. Performance Optimization

**Next.js:**
```bash
cd frontend
npm run build
# Check bundle size
npm run analyze
```

**Strapi:**
- Enable production mode
- Configure CDN for media files
- Set up Redis for caching (optional)

### 6. Monitoring Setup

Add health checks:

```yaml
# docker-compose.yml
services:
  frontend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Troubleshooting

### Issue: Strapi won't start

```bash
# Check logs
make logs-strapi

# Common fixes:
# 1. Database not ready
make down
make up

# 2. Port conflict
lsof -i :1337
kill -9 <PID>

# 3. Permission issues
chmod -R 755 backend/
```

### Issue: Frontend can't fetch data

```bash
# Check network
docker network inspect esjaythegreat-network

# Test API directly
curl http://localhost:1337/api/albums

# Check CORS settings in Strapi
# Settings → Advanced Settings → CORS
```

### Issue: Database connection fails

```bash
# Check PostgreSQL logs
make logs-postgres

# Test connection
docker-compose exec postgres psql -U strapi -d strapi

# Reset database (⚠️ deletes all data)
make clean-all
make build
make up
```

### Issue: Images not loading

1. Check Strapi media library settings
2. Verify file permissions on backend/public/uploads
3. Check CORS settings
4. For production: Use CDN or proper static file serving

## Maintenance Tasks

### Weekly
- Check logs for errors: `make logs`
- Verify all services: `make status`
- Test critical paths (newsletter, contact form)

### Monthly
- Update dependencies
- Review and delete old backups
- Check disk space
- Review security updates

### Quarterly  
- Full system backup test (restore from backup)
- Performance audit
- SEO audit
- Security audit

## Common Commands Reference

```bash
# Development
make up              # Start all services
make down            # Stop all services
make logs            # View all logs
make restart         # Restart everything

# Debugging
make logs-strapi     # Strapi logs only
make logs-frontend   # Frontend logs only
make shell-strapi    # SSH into Strapi container
make shell-frontend  # SSH into Frontend container

# Database
make db-console      # PostgreSQL console
make clean           # Clean without data loss
make clean-all       # ⚠️ Delete everything

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## Support

If you encounter issues:

1. Check logs: `make logs`
2. Verify environment variables
3. Check Docker container status: `make status`
4. Review this guide
5. Check Strapi documentation: https://docs.strapi.io
6. Check Next.js documentation: https://nextjs.org/docs

## Next Steps

- [ ] Add custom domain
- [ ] Set up SSL certificate
- [ ] Configure email service (SendGrid/Mailgun)
- [ ] Set up analytics (Google Analytics)
- [ ] Configure CDN for images
- [ ] Add more content (albums, blog posts, events)
- [ ] Customize design/branding
- [ ] Set up automated backups
- [ ] Configure monitoring and alerts
- [ ] Submit sitemap to Google Search Console

Good luck with your website! 🎵

| slug | UID | Required, target field: title |
| description | Text | Long text |
| releaseDate | Date | Required |
| lyrics | Rich Text | - |
| coverImage | Media | Single, Images only |
| melonUrl | Text | - |
| genieUrl | Text | - |
| bugsUrl | Text | - |
| spotifyUrl | Text | - |
| youtubeUrl | Text | - |

4. Save and wait for server restart

### Articles Content Type

1. Create new collection type: `article`
2. Add fields:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required |