# 🔄 Automated Deployment Guide (SSH)

Since you are using the **Manual SSH Deployment** method (because your cPanel lacks the Node.js selector), you can fully automate your deployment using **GitHub Actions**.

This means every time you push code to GitHub, it will automatically:
1.  Build your app.
2.  Upload the new files to your server.
3.  Install dependencies and restart the server.

## 🔍 How to Get Your Credentials

You need 4 secrets for GitHub. Here is where to find them:

### 1. `SSH_HOST` (Server IP)
*   Log in to **cPanel**.
*   Look at the **"General Information"** box on the right sidebar.
*   Copy the **"Shared IP Address"** (e.g., `172.105.8.156`).

### 2. `SSH_USERNAME`
*   Log in to **cPanel**.
*   Look at the **"Current User"** in the sidebar (e.g., `dawar`).
*   *This is the same username you use to log in to cPanel.*

### 3. `SSH_PORT`
*   **Default:** `22`
*   **FastComet / Namecheap / Bluehost:** Often use `21098` or `2222`.
*   *Check the "SSH Access" page in cPanel or your welcome email.*

### 4. `SSH_PRIVATE_KEY` (The Tricky Part)
You need to generate a new Key Pair. Follow these steps exactly:

#### Step A: Generate the Key (On Your Computer)
Run this command in your VS Code terminal:
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ./github_deploy_key
```
*   Press **Enter** when asked for a passphrase (leave it empty).
*   This creates two files in your folder: `github_deploy_key` and `github_deploy_key.pub`.

#### Step B: Authorize the Key (On cPanel)
1.  Open the `github_deploy_key.pub` file (Public Key) and copy **everything**.
2.  Log in to **cPanel**.
3.  Go to **Security** -> **SSH Access**.
4.  Click **Manage SSH Keys**.
5.  Click **Import Key**.
6.  Paste your key into the **"Public Key"** box. Name it "github_deploy". Click Import.
7.  **IMPORTANT:** Go back to the list, find "github_deploy", click **Manage**, and click **Authorize**.

#### Step C: Add to GitHub (The Private Key)
1.  Open the `github_deploy_key` file (Private Key) and copy **everything** (including `-----BEGIN OPENSSH PRIVATE KEY-----`).
2.  Go to your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
3.  Create a **New repository secret** named `SSH_PRIVATE_KEY` and paste the content.

---

## Step 5: Push to Deploy

We have already created the workflow file for you at `.github/workflows/deploy.yml`.

1.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Setup automated SSH deployment"
    git push origin main
    ```

2.  **Check Progress**:
    *   Go to the **Actions** tab in your GitHub repo.
    *   You will see the "Deploy to cPanel" workflow running.

## Troubleshooting

*   **"Host key verification failed"**: This usually happens if the `known_hosts` isn't set, but our workflow uses a plugin that handles this automatically.
*   **"Permission denied (publickey)"**:
    *   Make sure you **Authorized** the public key in cPanel.
    *   Make sure you copied the **Private Key** correctly into GitHub Secrets.
*   **PM2 not found**: Ensure NVM is loading correctly. The workflow script includes lines to load NVM, but if you installed Node.js differently, you might need to adjust the path.
