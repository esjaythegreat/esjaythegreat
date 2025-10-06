# esjaythegreat Website

Official website for esjaythegreat - singer-songwriter based in seoul.

## Tech Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Strapi 5 (Headless CMS)
- **Database**: PostgreSQL 15
- **Deployment**: Docker & Docker Compose

## Features

- 🎵 Music albums showcase with streaming links
- 📝 Blog with rich content support
- 📅 Events calendar for upcoming shows
- 💌 Newsletter subscription system
- 📧 Contact form
- 🔍 Full SEO optimization with structured data
- 📱 Fully responsive design
- 🌐 Bilingual support (Korean/English)

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Make (optional, for using Makefile commands)

## Quick Start

### 1. Setup Environment

```bash
# Copy environment example
cp .env.example .env

# Edit .env with your values
# Generate secrets:
openssl rand -base64 32  # For JWT_SECRET, API_TOKEN_SALT, ADMIN_JWT_SECRET
```

### 2. Start Services

```bash
# Using Makefile
make build
make up

# Or using Docker Compose
docker-compose up -d
```

### 3. Access Services

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

## Environment Configuration

The project supports three environments via `APP_ENV`:

- **local**: Development with hot-reload
- **development**: Mini-PC production mode
- **production**: Full production

### Environment Variables

Key variables in `.env`:

```bash
# Environment (local | development | production)
APP_ENV=local

# Database credentials
POSTGRES_USER=strapi
POSTGRES_PASSWORD=your_password
POSTGRES_DB=strapi

# Strapi secrets (generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
APP_KEYS=key1,key2,key3,key4

# Frontend URLs
NEXT_PUBLIC_STRAPI_API_URL=http://strapi:1337/api
NEXT_PUBLIC_STRAPI_BROWSER_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Makefile Commands

```bash
make help          # Show all commands
make build         # Build Docker containers
make up            # Start all services
make down          # Stop all services
make restart       # Restart services
make logs          # View all logs
make logs-strapi   # View Strapi logs
make logs-frontend # View Frontend logs
make clean         # Stop containers (keeps data)
make clean-cache   # Remove node_modules and build artifacts
make clean-all     # Remove everything including database
make status        # Show service status
```

## Project Structure

```
.
├── frontend/           # Next.js application
│   ├── app/           # Pages and components
│   ├── lib/           # Utilities (API, SEO, utils)
│   └── public/        # Static assets
├── backend/           # Strapi CMS
│   ├── src/
│   ├── config/
│   └── public/
├── docker-compose.yml # Unified Docker configuration
├── Makefile          # Easy commands
└── .env              # Environment variables
```

## Strapi Content Types

Create these in Strapi admin panel:

### Albums
- title (Text, Required)
- slug (UID, Required)
- description (Text, Long)
- releaseDate (Date, Required)
- lyrics (Rich Text)
- coverImage (Media, Single)
- melonUrl, genieUrl, bugsUrl, spotifyUrl, youtubeUrl (Text)

### Articles
- title (Text, Required)
- slug (UID, Required)
- excerpt (Text)
- content (Rich Text, Required)
- publishedDate (DateTime, Required)
- featuredImage (Media, Single)
- youtubeEmbedUrl (Text)

### Events
- title (Text, Required)
- date (DateTime, Required)
- venue (Text)
- city (Text)
- ticketUrl (Text)
- description (Rich Text)

See `SETUP_GUIDE.md` for detailed instructions.

## SEO Features

- Dynamic meta tags for all pages
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data (MusicAlbum, BlogPosting, MusicEvent)
- Automatic sitemap generation
- robots.txt (blocks non-production from indexing)
- Semantic HTML markup

## Development

### Local Development

```bash
# Frontend only
cd frontend
npm install
npm run dev

# Backend only
cd backend
npm install
npm run develop
```

### Production Build

Set `APP_ENV=production` in `.env`, then:

```bash
make build
make up
```

Frontend will build and run in production mode automatically.

## Deployment

### For Development Server (esjay.iptime.org)

```bash
# .env settings
APP_ENV=development
NODE_ENV=production
NEXT_PUBLIC_STRAPI_BROWSER_URL=http://esjay.iptime.org:1337
NEXT_PUBLIC_SITE_URL=http://esjay.iptime.org
```

### For Production Server (esjaythegreat.com)

```bash
# .env settings
APP_ENV=production
NODE_ENV=production
NEXT_PUBLIC_STRAPI_BROWSER_URL=https://esjaythegreat.com
NEXT_PUBLIC_SITE_URL=https://esjaythegreat.com
```

## Maintenance

### Backup Database

```bash
docker exec esjaythegreat-db pg_dump -U strapi strapi > backup.sql
```

### Restore Database

```bash
docker exec -i esjaythegreat-db psql -U strapi strapi < backup.sql
```

### View Logs

```bash
make logs              # All services
make logs-strapi       # Strapi only
make logs-frontend     # Frontend only
```

### Clean Build Artifacts

```bash
make clean-cache  # Remove node_modules, .next, etc.
make build        # Rebuild from scratch
make up           # Start services
```

## Troubleshooting

### Services won't start
```bash
make clean
make build
make up
```

### Cache issues / Build artifacts corrupted
```bash
make clean-cache  # Remove all node_modules and build files
make build
make up
```

### Database connection issues
```bash
make logs-postgres  # Check database logs
make db-console     # Test connection
```

### Port already in use
```bash
lsof -i :3000       # Find process
kill -9 <PID>       # Kill process
```

## Important Notes

### Lowercase Intentional
Throughout the codebase, you'll see comments like `// lowercase intentional`. This indicates that lowercase text (like "esjaythegreat", "seoul", "all rights reserved") is intentional styling and should not be changed to uppercase or title case.

### Environment-specific URLs
- **Local**: Use `localhost` for browser URLs
- **Development**: Use `esjay.iptime.org` (blocked from search engines)
- **Production**: Use `esjaythegreat.com` (indexed by search engines)

### Schema.org Types
The SEO implementation uses standard Schema.org structured data types:
- `MusicGroup` - For artist/band information
- `MusicAlbum` - For album pages
- `BlogPosting` - For blog posts
- `MusicEvent` - For concert/event listings

These are recognized by Google, Bing, and other search engines for rich results.

## Documentation

- **README.md** - This file (overview)
- **SETUP_GUIDE.md** - Step-by-step setup instructions
- **DEPLOYMENT.md** - Production deployment guide
- **QUICK_REFERENCE.md** - Command cheat sheet

## License

All rights reserved © 2025 esjaythegreat

## Support

For issues or questions:
1. Check documentation files
2. Review logs: `make logs`
3. Check service status: `make status`
4. Visit https://esjaythegreat.com/contact
# esjaythegreat Website

Official website for esjaythegreat - Seoul-based singer-songwriter.

## Tech Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Strapi 5 (Headless CMS)
- **Database**: PostgreSQL 15
- **Deployment**: Docker & Docker Compose

## Features

- 🎵 Music albums showcase with streaming links
- 📝 Blog with rich content support
- 📅 Events calendar for upcoming shows
- 💌 Newsletter subscription system
- 📧 Contact form
- 🔍 Full SEO optimization with structured data
- 📱 Fully responsive design
- 🌐 Bilingual support (Korean/English)

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Make (optional, for using Makefile commands)

## Quick Start

### Using Makefile (Recommended)

```bash
# Start all services
make up

# View logs
make logs

# Stop services
make down

# Rebuild containers
make build

# Restart all services
make restart

# View help
make help
```

### Using Docker Compose Directly

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=strapi
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=strapi
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_secure_password

# Strapi Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
APP_KEYS=key1,key2,key3,key4

# Email (optional)
EMAIL_PROVIDER=sendgrid
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_DEFAULT_FROM=noreply@esjaythegreat.com
EMAIL_DEFAULT_REPLY_TO=hello@esjaythegreat.com

# Frontend
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=https://esjaythegreat.com
NEXT_PUBLIC_SITE_NAME=esjaythegreat
NEXT_PUBLIC_DOMAIN=esjaythegreat.com
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/esjaythegreat
NEXT_PUBLIC_YOUTUBE=https://youtube.com/@esjaythegreat

# Node Environment
NODE_ENV=development
```

## Project Structure

```
.
├── frontend/              # Next.js application
│   ├── app/
│   │   ├── blog/         # Blog pages
│   │   ├── events/       # Events page
│   │   ├── music/        # Music album pages
│   │   ├── contact/      # Contact page
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities and API helpers
│   ├── public/           # Static assets
│   └── Dockerfile
├── backend/              # Strapi CMS
│   ├── src/
│   ├── config/
│   └── Dockerfile
├── docker-compose.yml    # Docker orchestration
├── Makefile             # Make commands
└── .env                 # Environment variables
```

## Services

### Frontend (Next.js)
- **Port**: 3000
- **URL**: http://localhost:3000

### Backend (Strapi)
- **Port**: 1337
- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

### Database (PostgreSQL)
- **Port**: 5432
- **Internal only** (not exposed to host)

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
npm install
npm run develop
```

## Strapi Content Types

You need to create these content types in Strapi admin panel:

### Albums
- title (Text)
- slug (UID)
- description (Text, Long)
- releaseDate (Date)
- lyrics (Rich text)
- coverImage (Media, Single)
- melonUrl (Text)
- genieUrl (Text)
- bugsUrl (Text)
- spotifyUrl (Text)
- youtubeUrl (Text)

### Articles
- title (Text)
- slug (UID)
- excerpt (Text)
- content (Rich text)
- publishedDate (DateTime)
- featuredImage (Media, Single)
- youtubeEmbedUrl (Text)

### Events
- title (Text)
- date (DateTime)
- venue (Text)
- city (Text)
- ticketUrl (Text)
- description (Rich text)

### Newsletter Subscribers
- email (Email, Unique)
- subscribedAt (DateTime)
- isActive (Boolean)
- unsubscribeToken (UID)

### Contact Messages
- name (Text)
- email (Email)
- subject (Text)
- message (Rich text)
- receivedAt (DateTime)
- isRead (Boolean)

## SEO Features

- ✅ Dynamic meta tags per page
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD) for:
  - Organization/Person
  - Music Albums
  - Blog Posts
  - Events
- ✅ XML Sitemap
- ✅ robots.txt
- ✅ Semantic HTML
- ✅ Optimized images with Next.js Image
- ✅ Proper heading hierarchy

## Makefile Commands

```bash
make help           # Show all available commands
make build          # Build Docker containers
make up             # Start services
make down           # Stop services
make restart        # Restart services
make logs           # View all logs
make logs-strapi    # View Strapi logs only
make logs-frontend  # View Frontend logs only
make logs-postgres  # View PostgreSQL logs only
make clean          # Stop and remove containers (keeps data)
make clean-all      # Remove everything including volumes (⚠️ deletes database)
make status         # Show service status
make shell-strapi   # Open shell in Strapi container
make shell-frontend # Open shell in Frontend container
make db-console     # Access PostgreSQL console
```

## Production Deployment

### Building for Production

```bash
# Frontend
cd frontend
npm run build
npm start

# Update docker-compose.yml environment
NODE_ENV=production
```

### Security Checklist

- [ ] Change all default passwords
- [ ] Generate new secure secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable Strapi production mode
- [ ] Configure proper backup strategy
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting

## Backup & Restore

### Database Backup

```bash
docker-compose exec postgres pg_dump -U strapi strapi > backup.sql
```

### Database Restore

```bash
docker-compose exec -T postgres psql -U strapi strapi < backup.sql
```

## Troubleshooting

### Services won't start
```bash
make clean
make build
make up
```

### Database connection issues
- Check if PostgreSQL container is healthy: `make status`
- Verify environment variables in `.env`
- Check logs: `make logs-postgres`

### Frontend can't connect to Strapi
- Ensure Strapi is running: `make logs-strapi`
- Verify `NEXT_PUBLIC_STRAPI_API_URL` in `.env`
- Check Docker network: `docker network ls`

## License

All rights reserved © 2025 esjaythegreat

## Contact

For questions or support, visit [esjaythegreat.com/contact](https://esjaythegreat.com/contact)
