.PHONY: help build up down restart logs logs-caddy logs-strapi logs-frontend logs-postgres logs-all clean clean-cache clean-all status ps backup restore

# Default target
help:
	@echo "Available commands:"
	@echo ""
	@echo "Service Management:"
	@echo "  make build          - Build all Docker containers"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make status         - Show service status"
	@echo "  make ps             - List running containers"
	@echo ""
	@echo "Logs (max 10MB per service, 40MB total):"
	@echo "  make logs           - View logs from all services (real-time)"
	@echo "  make logs-caddy     - View Caddy logs"
	@echo "  make logs-strapi    - View Strapi logs"
	@echo "  make logs-frontend  - View Frontend logs"
	@echo "  make logs-postgres  - View Postgres logs"
	@echo "  make logs-all       - View all logs (last 100 lines each)"
	@echo ""
	@echo "Shell Access:"
	@echo "  make shell-strapi   - Open shell in Strapi container"
	@echo "  make shell-frontend - Open shell in Frontend container"
	@echo "  make shell-postgres - Open shell in Postgres container"
	@echo "  make db-console     - Open PostgreSQL console"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean          - Stop and remove containers (keeps volumes)"
	@echo "  make clean-cache    - Remove node_modules and build artifacts"
	@echo "  make clean-all      - Stop and remove everything including volumes"
	@echo ""
	@echo "Backup & Restore:"
	@echo "  make backup         - Backup database and uploaded files"
	@echo "  make restore        - Restore from latest backup"

# Build all containers
build:
	@echo "Building Docker containers..."
	docker-compose build

# Start all services
up:
	@echo "Starting services..."
	docker-compose up -d
	@echo "Services started! Check status with 'make status'"

# Stop all services
down:
	@echo "Stopping services..."
	docker-compose down
	@echo "Services stopped."

# Restart all services
restart: down up

# View logs from all services (real-time)
logs:
	docker-compose logs -f

# View Caddy logs
logs-caddy:
	@echo "Viewing Caddy logs (Ctrl+C to exit)..."
	docker logs -f esjaythegreat-caddy

# View Strapi logs
logs-strapi:
	@echo "Viewing Strapi logs (Ctrl+C to exit)..."
	docker logs -f esjaythegreat-strapi

# View Frontend logs
logs-frontend:
	@echo "Viewing Frontend logs (Ctrl+C to exit)..."
	docker logs -f esjaythegreat-frontend

# View Postgres logs
logs-postgres:
	@echo "Viewing Postgres logs (Ctrl+C to exit)..."
	docker logs -f esjaythegreat-db

# View all logs (last 100 lines from each service)
logs-all:
	@echo "=== Caddy Logs (last 100 lines) ==="
	@docker logs --tail 100 esjaythegreat-caddy
	@echo ""
	@echo "=== Strapi Logs (last 100 lines) ==="
	@docker logs --tail 100 esjaythegreat-strapi
	@echo ""
	@echo "=== Frontend Logs (last 100 lines) ==="
	@docker logs --tail 100 esjaythegreat-frontend
	@echo ""
	@echo "=== Postgres Logs (last 100 lines) ==="
	@docker logs --tail 100 esjaythegreat-db

# Clean - stop and remove containers (keeps volumes and data)
clean:
	@echo "Stopping and removing containers (keeping volumes)..."
	docker-compose down
	@echo "Clean complete. Database data is preserved."

# Clean build artifacts and caches
clean-cache:
	@echo "Cleaning build caches and node_modules..."
	@echo "Removing frontend build artifacts..."
	rm -rf frontend/node_modules frontend/.next frontend/.turbo
	@echo "Removing backend build artifacts..."
	rm -rf backend/node_modules backend/.cache backend/build backend/dist
	@echo "Cache clean complete. Run 'make build' to rebuild."

# Clean everything including volumes (WARNING: deletes database data)
clean-all:
	@echo "WARNING: This will delete all data including the database!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		echo "All containers and volumes removed."; \
	else \
		echo "Cancelled."; \
	fi

# Show service status
status:
	@echo "Service Status:"
	@docker-compose ps

# List running containers (alias for status)
ps: status

# Open shell in Strapi container
shell-strapi:
	docker-compose exec strapi sh

# Open shell in Frontend container
shell-frontend:
	docker-compose exec frontend sh

# Open shell in Postgres container
shell-postgres:
	docker-compose exec postgres sh

# View database
db-console:
	docker-compose exec postgres psql -U $${POSTGRES_USER:-strapi} -d $${POSTGRES_DB:-strapi}

# Backup database (pg_dump) and uploaded files (tar) into ./backups
backup:
	@set -e; \
	BKDIR="$$(pwd)/backups"; \
	mkdir -p "$$BKDIR"; \
	TS="$$(date +%Y%m%d_%H%M%S)"; \
	DB_TMP="$$BKDIR/db_$${TS}.sql.tmp"; \
	UP_TMP="$$BKDIR/uploads_$${TS}.tar.gz.tmp"; \
	echo "Backing up database to $$BKDIR/db_$${TS}.sql ..."; \
	docker-compose exec -T postgres sh -c 'PGPASSWORD="$$POSTGRES_PASSWORD" pg_dump -U "$$POSTGRES_USER" "$$POSTGRES_DB"' > "$$DB_TMP"; \
	if [ ! -s "$$DB_TMP" ]; then echo "ERROR: pg_dump produced no data"; rm -f "$$DB_TMP"; exit 1; fi; \
	echo "Backing up uploads to $$BKDIR/uploads_$${TS}.tar.gz ..."; \
	docker-compose exec -T strapi sh -c 'cd /opt/app/public 2>/dev/null && tar -czf - uploads 2>/dev/null || tar -czf - --files-from /dev/null' > "$$UP_TMP"; \
	if [ ! -s "$$UP_TMP" ]; then echo "ERROR: uploads tar produced no data"; rm -f "$$UP_TMP"; exit 1; fi; \
	mv "$$DB_TMP" "$$BKDIR/db_$${TS}.sql"; \
	mv "$$UP_TMP" "$$BKDIR/uploads_$${TS}.tar.gz"; \
	echo "Backup complete:"; \
	echo "  - $$BKDIR/db_$${TS}.sql"; \
	echo "  - $$BKDIR/uploads_$${TS}.tar.gz"

# Restore from timestamped backups (psql + untar)
restore:
	@set -e; \
	BKDIR="$$(pwd)/backups"; \
	echo "Available backups:"; \
	ls -lht "$$BKDIR"/ | head -10 || true; \
	echo ""; \
	read -p "Enter backup timestamp (YYYYMMDD_HHMMSS): " TS; \
	DBFILE="$$BKDIR/db_$${TS}.sql"; \
	UPFILE="$$BKDIR/uploads_$${TS}.tar.gz"; \
	if [ -f "$$DBFILE" ]; then \
		echo "Restoring database from $$DBFILE ..."; \
		docker-compose exec -T postgres sh -c 'PGPASSWORD="$$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"' < "$$DBFILE"; \
		echo "Database restored."; \
	else \
		echo "Database backup not found: $$DBFILE"; exit 1; \
	fi; \
	if [ -f "$$UPFILE" ]; then \
		echo "Restoring uploads from $$UPFILE ..."; \
		docker-compose exec -T strapi sh -c 'mkdir -p /opt/app/public/uploads && tar -xzf - -C /opt/app/public' < "$$UPFILE"; \
		echo "Files restored."; \
	else \
		echo "Uploads backup not found: $$UPFILE"; \
	fi
