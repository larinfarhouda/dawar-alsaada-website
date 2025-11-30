# 🔄 Automated Deployment Guide (SSH)

Since you are using the **Manual SSH Deployment** method (because your cPanel lacks the Node.js selector), you can fully automate your deployment using **GitHub Actions**.

This means every time you push code to GitHub, it will automatically:
1.  Build your app.
2.  Upload the new files to your server.
3.  Install dependencies and restart the server.

## Prerequisites

1.  **GitHub Repository**: Your code must be on GitHub.
2.  **SSH Access**: You must have SSH access to your cPanel account.
3.  **App Folder**: You should have already done the "Manual Deployment" at least once to create the folder (e.g., `/home/username/dawar-app`).

## Step 1: Generate SSH Keys

You need a special SSH key for GitHub to access your server without a password.

1.  **On your local computer**, open a terminal and run:
    ```bash
    ssh-keygen -t rsa -b 4096 -C "github-actions" -f ./github_deploy_key
    ```
    *Press Enter for no passphrase.*

2.  This creates two files:
    *   `github_deploy_key` (Private Key)
    *   `github_deploy_key.pub` (Public Key)

## Step 2: Add Public Key to Server

1.  **Copy the content** of `github_deploy_key.pub`.
2.  **Log in to cPanel**.
3.  Go to **SSH Access** -> **Manage SSH Keys** -> **Import Key**.
4.  Paste the public key and name it (e.g., `github_deploy`).
5.  **Authorize** the key: Go back to "Manage SSH Keys", find the key you just imported, click **Manage**, and then **Authorize**.

*Alternatively, if you are already logged in via SSH:*
```bash
# Paste the content of github_deploy_key.pub into authorized_keys
nano ~/.ssh/authorized_keys
```

## Step 3: Configure GitHub Secrets

1.  Go to your repository on **GitHub**.
2.  Click **Settings** -> **Secrets and variables** -> **Actions**.
3.  Click **New repository secret**.
4.  Add the following secrets:

| Name | Value |
| :--- | :--- |
| `SSH_HOST` | Your server IP address (e.g., `123.45.67.89`) |
| `SSH_USERNAME` | Your cPanel username |
| `SSH_PORT` | Your SSH port (usually `22`, but check your host, e.g., `21098`) |
| `SSH_PRIVATE_KEY` | The **entire content** of the `github_deploy_key` file you generated in Step 1. |

## Step 4: Push to Deploy

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
