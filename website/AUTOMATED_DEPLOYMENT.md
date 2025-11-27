# 🔄 Automated Deployment Guide (GitHub Actions)

This guide explains how to set up **Continuous Deployment (CD)** so that every time you push code to GitHub, it automatically builds and uploads to your cPanel server.

## Prerequisites

1.  A **GitHub Repository** with your code.
2.  **FTP Access** to your cPanel hosting.
3.  The `.github/workflows/deploy.yml` file (already created in your project).

---

## Step 1: Prepare Your cPanel Server

1.  **Create an FTP Account** (Optional but Recommended):
    *   Log in to **cPanel**.
    *   Go to **Files** -> **FTP Accounts**.
    *   Create a new account (e.g., `deployer`).
    *   **Directory:** Set this to the **exact folder** where your Node.js app lives (e.g., `repositories/dawar` or `public_html`).
        *   *Tip: If you point it directly to the app folder, your "server-dir" in GitHub will just be `./`.*
    *   **Save the password!**

2.  **Verify the Path:**
    *   If you use your main cPanel account, find out the full path to your app folder relative to your home directory.
    *   Example: `repositories/dawar/`

---

## Step 2: Configure GitHub Secrets

GitHub needs your FTP password to upload files, but you shouldn't put it in the code. We use "Secrets" for this.

1.  Go to your repository on **GitHub**.
2.  Click **Settings** (top right tab).
3.  In the left sidebar, click **Secrets and variables** -> **Actions**.
4.  Click the green button **New repository secret**.
5.  Add the following 3 secrets:

    | Name | Value |
    | :--- | :--- |
    | `FTP_SERVER` | Your domain (e.g., `ftp.dawar.sa`) or Server IP (e.g., `172.105.8.156`) |
    | `FTP_USERNAME` | Your FTP username (e.g., `deployer@dawar.sa`) |
    | `FTP_PASSWORD` | Your FTP password |

---

## Step 3: Check the Workflow File

Open `.github/workflows/deploy.yml` in your code editor.

1.  Look at the last section:
    ```yaml
    with:
      server: ${{ secrets.FTP_SERVER }}
      username: ${{ secrets.FTP_USERNAME }}
      password: ${{ secrets.FTP_PASSWORD }}
      local-dir: ./deploy/
      server-dir: ./repositories/dawar/  <-- IMPORTANT
    ```
2.  **Update `server-dir`**:
    *   If your FTP account was created specifically for the app folder (Step 1), change this to `./`.
    *   If you are using your main account, make sure this path matches your folder structure in File Manager.

---

## Step 4: Push to Deploy

Now, everything is ready.

1.  Commit your changes:
    ```bash
    git add .
    git commit -m "Setup automated deployment"
    ```
2.  Push to GitHub:
    ```bash
    git push origin main
    ```

3.  **Watch the Action:**
    *   Go to your GitHub repo page.
    *   Click the **Actions** tab.
    *   You should see a workflow running. Click it to see the progress.

---

## Step 5: Finalize on Server (The "Restart" Step)

Since you don't have SSH access to run commands automatically, there is **one manual step** required after the deployment finishes:

1.  Log in to **cPanel**.
2.  Go to **Setup Node.js App**.
3.  Click the **Restart Application** button.

*Note: If you only changed frontend code (CSS/JS/HTML), you might not need to restart. But if you changed API routes or server logic, you MUST restart.*

---

## Troubleshooting

*   **FTP Connection Failed:** Check your `FTP_SERVER` (try using the IP address instead of domain) and verify credentials.
*   **"Permission Denied":** Ensure the FTP user has write permissions to the folder.
*   **Site Broken after Deploy:**
    *   Check if `node_modules` is missing. (Go to cPanel -> Node.js App -> Run NPM Install).
    *   Check if `.env` is missing (It should stay on the server, but make sure you didn't delete it).
