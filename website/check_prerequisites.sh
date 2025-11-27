#!/bin/bash

echo "Checking server prerequisites..."
echo "--------------------------------"

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node -v)"
else
    echo "❌ Node.js is NOT installed."
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    echo "✅ MySQL is installed: $(mysql --version)"
else
    echo "❌ MySQL is NOT installed."
fi

# Check PM2
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 is installed: $(pm2 -v)"
else
    echo "❌ PM2 is NOT installed."
fi

# Check Nginx
if command -v nginx &> /dev/null; then
    echo "✅ Nginx is installed: $(nginx -v 2>&1 | grep -o 'nginx/[^ ]*')"
else
    echo "❌ Nginx is NOT installed."
fi

# Check Git
if command -v git &> /dev/null; then
    echo "✅ Git is installed: $(git --version)"
else
    echo "❌ Git is NOT installed."
fi

echo "--------------------------------"
echo "If any components are missing, please refer to DEPLOYMENT.md for installation instructions."
