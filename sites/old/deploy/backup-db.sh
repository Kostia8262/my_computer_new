#!/bin/bash
# SQLite database backup script
# Run manually or via cron: 0 3 * * * /path/to/backup-db.sh
# Keeps last 7 daily backups

DB_PATH="/usr/local/lsws/mycomputer.education/html/server/db.sqlite3"
BACKUP_DIR="/root/backups/db"
DATE=$(date +%Y-%m-%d)

mkdir -p "$BACKUP_DIR"
cp "$DB_PATH" "$BACKUP_DIR/db_$DATE.sqlite3"

# Keep only last 7 backups
ls -t "$BACKUP_DIR"/*.sqlite3 | tail -n +8 | xargs -r rm

echo "Backup saved: $BACKUP_DIR/db_$DATE.sqlite3"
ls -lh "$BACKUP_DIR/"
