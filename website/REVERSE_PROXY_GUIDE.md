# 🔄 Reverse Proxy Setup Guide

You asked to use a **Reverse Proxy**. This is the industry-standard technique for deploying Node.js applications.

## What is a Reverse Proxy?

A Reverse Proxy sits in front of your application. It accepts traffic from the internet (on standard ports 80 and 443) and forwards it to your Node.js application running internally (e.g., on port 3000).

**Why use it?**
1.  **Security:** Your Node.js app isn't directly exposed to the internet.
2.  **SSL/HTTPS:** The proxy handles the SSL encryption (https), so your Node app doesn't have to.
3.  **Performance:** The proxy serves static files (images, css) faster than Node.js.

---

## Option 1: cPanel / Apache (Your Current Setup)

Since you are on cPanel, the web server is **Apache**. We configure the reverse proxy using an `.htaccess` file.

### 1. Ensure your App is Running
Your Node.js app must be running in the background on a specific port (e.g., 3000).
```bash
# SSH into your server
pm2 start server.js --name "dawar-website" -- 3000
```

### 2. Create the Proxy Rule
Create or edit the `.htaccess` file in your `public_html` folder.

**File:** `/home/username/public_html/.htaccess`

```apache
# Turn on the Rewrite Engine
RewriteEngine On

# 1. Force HTTPS (Optional but recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. Serve Existing Static Files Directly
# If a file exists (like an image), Apache serves it. Node.js is not bothered.
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# 3. Reverse Proxy to Node.js
# Forward all other traffic to localhost:3000
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

### Troubleshooting cPanel Proxy
*   **500 Internal Server Error:** This usually means `mod_proxy` and `mod_proxy_http` are NOT enabled on your server.
    *   **Fix:** Contact your hosting support (FastComet) and ask: *"Please enable mod_proxy and mod_proxy_http for my account so I can deploy a Node.js app."*

---

## Option 2: Nginx (VPS / Dedicated Server)

If you move to a VPS (Virtual Private Server) where you have root access, **Nginx** is the best reverse proxy.

### 1. Install Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 2. Configure the Server Block
Edit the config file: `/etc/nginx/sites-available/default` (or your domain file).

```nginx
server {
    listen 80;
    server_name dawar.sa www.dawar.sa;

    # Redirect HTTP to HTTPS (Certbot will handle this usually)
    # return 301 https://$host$request_uri;

    location / {
        # THE REVERSE PROXY CONFIGURATION
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## Summary
*   **On cPanel:** Use `.htaccess` with `RewriteRule [P]`.
*   **On VPS:** Use Nginx with `proxy_pass`.

Both achieve the exact same "Reverse Proxy" result.
