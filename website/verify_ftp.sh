#!/bin/bash

# Instructions:
# 1. Open this file and replace the values below with your FTP details.
# 2. Run the script: chmod +x verify_ftp.sh && ./verify_ftp.sh

FTP_HOST="ftp.yourdomain.com" # Replace with your domain or IP
FTP_USER="your_username"      # Replace with your FTP username
FTP_PASS="your_password"      # Replace with your FTP password

echo "---------------------------------------------------"
echo "Testing FTP Connection to $FTP_HOST..."
echo "---------------------------------------------------"

# List the files in the root directory of the FTP account
curl -s -v --ftp-ssl --user "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/" 2>&1 | grep -E "< 230|list" -A 20

echo "---------------------------------------------------"
echo "INTERPRETING THE RESULTS:"
echo "1. If you see 'Login successful' (code 230), your credentials are correct."
echo "2. Look at the file list above."
echo "   - If you see 'package.json', '.next', etc., then your FTP account points DIRECTLY to your app folder."
echo "     -> In GitHub Actions, set 'server-dir' to './'"
echo "   - If you see a folder named 'dawar-app' or 'repositories', then you are in the parent folder."
echo "     -> In GitHub Actions, set 'server-dir' to './dawar-app/' (or whatever the folder name is)."
echo "---------------------------------------------------"
