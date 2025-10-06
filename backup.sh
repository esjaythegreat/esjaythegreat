#!/bin/bash
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "💾 Creating backup..."
docker-compose exec -T postgres pg_dump -U ${POSTGRES_USER:-esjaythegreat} ${POSTGRES_DB:-esjaythegreat} > "$BACKUP_DIR/db_$DATE.sql"
docker-compose exec -T strapi tar -czf - /opt/app/public/uploads > "$BACKUP_DIR/uploads_$DATE.tar.gz"

echo "✅ Backup complete!"
echo "   Database: $BACKUP_DIR/db_$DATE.sql"
echo "   Uploads:  $BACKUP_DIR/uploads_$DATE.tar.gz"
