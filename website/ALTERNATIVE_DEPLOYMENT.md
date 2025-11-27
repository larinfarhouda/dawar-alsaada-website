# 🌍 Alternative Deployment: Vercel + Remote MySQL

If your cPanel hosting does not support Node.js (no "Setup Node.js App" icon), you cannot run this application directly on that server.

**The Solution:**
1.  Host the **Application** (Frontend + Backend Logic) on **Vercel** (Free & Fast).
2.  Keep the **Database** on your **cPanel Server**.

## Step 1: Configure cPanel for Remote Access

By default, your database only accepts connections from `localhost`. You need to allow Vercel to connect.

1.  Log in to **cPanel**.
2.  Go to **Databases** -> **Remote MySQL®**.
3.  In the **"Add Access Host"** field, enter: `%`
    *   *Note: `%` allows connections from ANY IP. This is the easiest way. For better security, you can try to find Vercel's IP ranges, but they change often.*
4.  Click **Add Host**.

## Step 2: Push Code to GitHub

You need your code on GitHub to deploy to Vercel.

1.  Create a new repository on GitHub (e.g., `dawar-website`).
2.  Push your code:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/dawar-website.git
    git push -u origin main
    ```

## Step 3: Deploy to Vercel

1.  Go to [vercel.com](https://vercel.com) and sign up (using GitHub is easiest).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `dawar-website` repository.
4.  **Configure Project:**
    *   **Framework Preset:** Next.js (should be auto-detected).
    *   **Root Directory:** `./` (default).
    *   **Environment Variables:** You need to add your database URL here.
        *   Name: `DATABASE_URL`
        *   Value: `mysql://dawar_user:YOUR_PASSWORD@YOUR_DOMAIN.com:3306/dawar_db`
        *   *Important:* Replace `localhost` with your actual domain name (e.g., `dawar.sa`) or your server's IP address.

5.  Click **Deploy**.

## Step 4: Run Migrations (from your computer)

Since Vercel builds the app but doesn't run migrations automatically, you should run them from your local machine, pointing to the remote database.

1.  Edit your local `.env` file to point to the **remote** database temporarily:
    ```env
    DATABASE_URL="mysql://dawar_user:YOUR_PASSWORD@YOUR_DOMAIN.com:3306/dawar_db"
    ```
2.  Run the migration command:
    ```bash
    npx prisma migrate deploy
    ```
3.  (Optional) Seed the database:
    ```bash
    npm run seed
    ```
4.  *Revert your local `.env` back to localhost if you want to continue developing locally.*

## Troubleshooting

### "Can't connect to database"
*   **Check Host:** Make sure you replaced `localhost` with your domain name or server IP in the connection string.
*   **Check Port:** Ensure port `3306` is open. Some shared hosts block this port. You might need to ask support to "Open port 3306 for remote access".
*   **Check User:** Ensure the database user has `%` (wildcard) access privileges, not just `localhost`.

### "Prisma Client not found"
*   In your `package.json`, ensure `"postinstall": "prisma generate"` is in the `scripts` section. Vercel runs this automatically.
