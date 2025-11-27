# Deployment Guide for Dawar Al Saada Website

This guide assumes you are deploying to a Linux server (e.g., Ubuntu) with Node.js and MySQL installed.

## Prerequisites

On your server, ensure you have the following installed:

1.  **Node.js** (v18 or later)
2.  **MySQL** (v8.0 or later)
3.  **PM2** (Process Manager for Node.js)
4.  **Nginx** (Web Server / Reverse Proxy)
5.  **Git**

### Verify Prerequisites

You can run the included script to check if everything is installed:

```bash
# Make the script executable
chmod +x check_prerequisites.sh

# Run the check
./check_prerequisites.sh
```

Or check manually:

```bash
node -v      # Should be v18+
mysql --version
pm2 -v
nginx -v
git --version
```

### Install Prerequisites (Ubuntu)

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

## Deployment Steps

### 1. Clone the Repository

Navigate to your web directory (e.g., `/var/www`) and clone the repository.

```bash
cd /var/www
git clone <your-repo-url> dawar-website
cd dawar-website
```

*Alternatively, if you don't use Git on the server, you can upload your project files using SCP or FTP.*

### 2. Install Dependencies

```bash
npm install --production
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```bash
cp .env.example .env  # If you have an example file
nano .env
```

Add your production database connection string and other secrets:

```env
DATABASE_URL="mysql://user:password@localhost:3306/dawar_db"
# Add other environment variables here
```

### 4. Database Setup

Log in to MySQL and create the database if it doesn't exist.

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE dawar_db;
CREATE USER 'dawar_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON dawar_db.* TO 'dawar_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Run Prisma migrations to set up the schema:

```bash
npx prisma migrate deploy
```

*(Optional) Seed the database:*
```bash
npm run seed
```

### 5. Build the Application

```bash
npm run build
```

### 6. Start with PM2

We have included an `ecosystem.config.js` file for PM2.

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

This will start the app on port 3000 and ensure it restarts on reboot.

### 7. Configure Nginx

Create a new Nginx server block configuration.

```bash
sudo nano /etc/nginx/sites-available/dawar-website
```

Add the following configuration (replace `your_domain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/dawar-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. SSL Configuration (Optional but Recommended)

Use Certbot to set up free SSL certificates with Let's Encrypt.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

## Updating the App

To deploy changes later:

```bash
cd /var/www/dawar-website
git pull origin main
npm install
npx prisma migrate deploy
npm run build
pm2 restart dawar-website
```
