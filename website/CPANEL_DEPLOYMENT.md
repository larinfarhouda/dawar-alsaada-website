# 🚀 cPanel Deployment Guide (FastComet)

Since you are using a managed cPanel hosting (FastComet) without `sudo` access, you cannot use the standard Linux deployment method. Instead, you should use the **"Setup Node.js App"** feature in cPanel.

## 1. Prepare Your Project
We have added a `server.js` file to your project. This is required for cPanel to start your Next.js app correctly.

1.  **Build locally** (Recommended for faster deployment):
    ```bash
    npm run build
    ```
    This creates the `.next` folder.

2.  **Zip your project files**:
    Select the following files/folders and zip them into `website.zip`:
    - `.next` (folder)
    - `public` (folder)
    - `package.json`
    - `server.js`
    - `.env` (Make sure this has your production DB credentials)
    - `prisma` (folder)
    - `next.config.mjs`

    *Do NOT zip `node_modules`. We will install them on the server.*

## 2. Configure Database in cPanel
1.  Log in to **cPanel**.
2.  Go to **Databases** -> **MySQL® Database Wizard**.
3.  **Step 1**: Create a database (e.g., `dawar_db`).
4.  **Step 2**: Create a user (e.g., `dawar_user`) and password.
5.  **Step 3**: Assign the user to the database and check **ALL PRIVILEGES**.
6.  **Update your `.env` file** in the zip (or edit it later on the server) with these new credentials:
    ```env
    DATABASE_URL="mysql://dawar_user:password@localhost:3306/dawar_db"
    ```

## 3. Upload Files
1.  Go to **Files** -> **File Manager**.
2.  Create a folder for your app (e.g., `repositories/dawar`).
3.  **Upload** your `website.zip` to this folder.
4.  **Extract** the zip file.

## 4. Setup Node.js App
1.  Go to **Software** -> **Setup Node.js App**.
2.  Click **Create Application**.
3.  **Node.js Version**: Select **v18** or higher (match your local version).
4.  **Application Mode**: Select **Production**.
5.  **Application Root**: Enter the path to your files (e.g., `repositories/dawar`).
6.  **Application URL**: Select your domain (e.g., `dawar.sa`).
7.  **Application Startup File**: Enter `server.js`.
8.  Click **Create**.

## 5. Install Dependencies
1.  Once created, the app details page will open.
2.  Click the **Run NPM Install** button.
    *   *If this fails or takes too long, you can do it via terminal:*
    *   *Copy the "Enter to the virtual environment" command shown at the top of the page.*
    *   *Paste it into your terminal (SSH).*
    *   *Run `npm install`.*

## 6. Run Database Migrations
You need to apply the database schema.
1.  Open your **Terminal** (SSH) or use the "Terminal" inside cPanel.
2.  Enter your app's virtual environment (command found in Node.js App page).
3.  Run:
    ```bash
    npx prisma migrate deploy
    ```
4.  (Optional) Seed data:
    ```bash
    npm run seed
    ```

## 7. Restart the App
1.  Go back to **Setup Node.js App**.
2.  Click **Restart Application**.

Your site should now be live!

## Troubleshooting
- **500 Error**: Check the `stderr.log` in your application root folder.
- **Database Error**: Double-check your `.env` file credentials.
- **"dawar is not in the sudoers file"**: This is normal. You don't need `sudo`. Use the cPanel interface as described above.

## 8. Updating Your App
When you make changes to your code, follow these steps to update the live site:

1.  **Make changes** on your computer.
2.  **Rebuild** the project:
    ```bash
    npm run build
    ```
3.  **Create a new Zip**:
    *   Zip the same files as before (`.next`, `public`, `package.json`, `server.js`, `prisma`, `next.config.mjs`).
    *   **IMPORTANT:** Do **NOT** include your local `.env` file in this zip, or you will overwrite your production database passwords!
4.  **Upload & Extract**:
    *   Go to cPanel File Manager.
    *   Upload the new zip to your app folder.
    *   Extract and select **"Overwrite existing files"**.
5.  **Update Dependencies (if needed)**:
    *   If you installed new packages, click **Run NPM Install** in the Node.js App dashboard.
6.  **Update Database (if needed)**:
    *   If you changed the Prisma schema, run `npx prisma migrate deploy` in the terminal.
7.  **Restart**:
    *   Click **Restart Application** in the Node.js App dashboard.

