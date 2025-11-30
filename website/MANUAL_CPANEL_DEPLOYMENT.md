# Manual cPanel Deployment (SSH Method)

If your cPanel does not have the **"Setup Node.js App"** feature, you must deploy manually using **SSH**.

> **⚠️ Requirement:** You must have **SSH Access** enabled on your hosting account. If you don't have this, you cannot run a dynamic Next.js app (with a database) on this host. You would need to upgrade to a VPS or use a host like Vercel, Netlify, or Railway.

## 1. Connect via SSH

Open your terminal (on Mac/Linux) or PowerShell (Windows) and connect to your server:

```bash
ssh username@yourdomain.com -p 22
# Enter your cPanel password when prompted
```

*(Note: The port might be different, e.g., 21098. Check your hosting email.)*

## 2. Install Node.js (via NVM)

Since you don't have root access, you should use **NVM (Node Version Manager)** to install Node.js in your user directory.

1.  **Install NVM:**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```

2.  **Activate NVM:**
    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    ```

3.  **Install Node.js:**
    ```bash
    nvm install 18
    nvm use 18
    nvm alias default 18
    ```

4.  **Verify:**
    ```bash
    node -v
    npm -v
    ```

## 3. Upload & Extract Files

1.  Upload your `website.zip` to your `public_html` (or a subdirectory like `public_html/app`) using cPanel File Manager.
2.  Extract it.
3.  **Important:** For security, it is better to place the app code **outside** `public_html` (e.g., `/home/username/dawar-app`) and only proxy the traffic.
    *   Let's assume you extracted it to: `/home/username/dawar-app`

## 4. Install Dependencies

Navigate to your app folder in SSH:

```bash
cd /home/username/dawar-app
npm install --production
```

## 5. Setup Database

1.  Create the MySQL database and user in cPanel.
2.  Edit your `.env` file:
    ```bash
    nano .env
    ```
    Update `DATABASE_URL` with your credentials.
3.  Run migrations:
    ```bash
    npx prisma migrate deploy
    ```

## 6. Start the App with PM2

We use PM2 to keep the app running in the background.

1.  **Install PM2:**
    ```bash
    npm install -g pm2
    ```

2.  **Start the App:**
    ```bash
    pm2 start server.js --name "dawar-website"
    ```

3.  **Save the Process List:**
    ```bash
    pm2 save
    ```

    *Note: If the server reboots, you might need to restart this manually unless you can set up a cron job for `pm2 resurrect`.*

## 7. Expose to the Web (.htaccess)

Since the app is running on `localhost:3000`, we need to tell the web server (Apache/LiteSpeed) to forward traffic from your domain to that port.

1.  Go to `public_html` (or the folder where your domain points).
2.  Create or Edit `.htaccess`:
    ```bash
    nano /home/username/public_html/.htaccess
    ```
3.  **Add the following lines:**

    ```apache
    DirectoryIndex disabled
    RewriteEngine On
    RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
    ```

    *Replace `3000` with the port your app is running on if different.*

## Troubleshooting

-   **500 Internal Server Error:** This usually means the `.htaccess` RewriteRule failed (mod_proxy might not be enabled). If this happens, ask your hosting support to "Enable mod_proxy and mod_proxy_http".
-   **App stops working:** Check PM2 status: `pm2 status`. Restart if needed: `pm2 restart dawar-website`.
