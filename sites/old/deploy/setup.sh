#!/bin/bash
# First-time setup for mycomputer.education on Hostinger OpenLiteSpeed VPS
# Run as root: bash setup.sh
# VPS: Ubuntu 22.04 + OpenLiteSpeed (LSAPI) — NOT gunicorn/nginx

set -e

VH_ROOT="/usr/local/lsws/mycomputer.education/html"
REPO="https://github.com/Kostia8262/My_Computer_Old.git"

echo "=== 1. Clone repo to temp dir ==="
cd "$VH_ROOT"
git clone -b master "$REPO" /tmp/mc_deploy
echo "Cloned."

echo "=== 2. Copy Django server code ==="
rsync -av --exclude='.git' /tmp/mc_deploy/server/ "$VH_ROOT/server/"

echo "=== 3. Copy React source code ==="
rsync -av --exclude='.git' /tmp/mc_deploy/client/ "$VH_ROOT/src/"

echo "=== 4. Python virtual environment ==="
cd "$VH_ROOT/server"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "=== 5. Create .env file with secrets ==="
cat > "$VH_ROOT/server/server/.env" << 'ENV_EOF'
SECRET_KEY=REPLACE_WITH_STRONG_RANDOM_KEY
DEBUG=False
ALLOWED_HOSTS=mycomputer.education,62.72.21.71
TELEGRAM_BOT_TOKEN=REPLACE_WITH_TOKEN
TELEGRAM_CHAT_ID=REPLACE_WITH_CHAT_ID
ENV_EOF
echo ">>> Edit $VH_ROOT/server/server/.env with real values before continuing!"
read -p "Press Enter after editing .env..."

echo "=== 6. Django migrations and static ==="
cd "$VH_ROOT/server"
source venv/bin/activate
python manage.py migrate --noinput
python manage.py collectstatic --noinput

echo "=== 7. Build React SPA ==="
cd "$VH_ROOT/src"
npm install
npm run build
# Build output goes to /html/client/ via BUILD_PATH=../client in .env

echo "=== 8. Set file permissions ==="
chown -R nobody:nogroup "$VH_ROOT/server/static/"
chown -R nobody:nogroup "$VH_ROOT/server/media/"
chown -R nobody:nogroup "$VH_ROOT/client/"

echo "=== 9. Cleanup temp files ==="
rm -rf /tmp/mc_deploy

echo ""
echo "=== DONE ==="
echo "Restart OLS: /usr/local/lsws/bin/lswsctrl restart"
echo "OLS Admin: https://62.72.21.71:7080"
echo "Site: https://mycomputer.education/"
