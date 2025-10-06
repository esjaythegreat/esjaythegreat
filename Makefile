.PHONY: help build up down restart logs logs-strapi logs-frontend logs-postgres clean clean-all status ps

# Default target
help:
	@echo "Available commands:"
	@echo "  make build          - Build all Docker containers"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make logs           - View logs from all services"
	@echo "  make logs-strapi    - View Strapi logs"
	@echo "  make logs-frontend  - View Frontend logs"
	@echo "  make logs-postgres  - View Postgres logs"
	@echo "  make clean          - Stop and remove containers (keeps volumes)"
	@echo "  make clean-all      - Stop and remove everything including volumes"
	@echo "  make status         - Show service status"
	@echo "  make ps             - List running containers"
	@echo "  make shell-strapi   - Open shell in Strapi container"
	@echo "  make shell-frontend - Open shell in Frontend container"
	@echo "  make shell-postgres - Open shell in Postgres container"

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

# View logs from all services
logs:
	docker-compose logs -f

# View Strapi logs
logs-strapi:
	docker-compose logs -f strapi

# View Frontend logs
logs-frontend:
	docker-compose logs -f frontend

# View Postgres logs
logs-postgres:
	docker-compose logs -f postgres

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
