# 🚀 CMS Dashboard Setup Guide

## Current Status

✅ **Completed:**
- All dashboard pages built and functional
- Menu management with CRUD operations
- Branches management with CRUD operations
- Job applications management with status tracking
- Authentication system (login/logout)
- Prisma schema configured for MySQL
- Seed data prepared
- Server actions implemented

⏳ **Remaining:**
- Install and configure MySQL
- Run database migrations
- Seed initial data

---

## Step-by-Step Setup Instructions

### Step 1: Install MySQL

Install MySQL using Homebrew:

```bash
brew install mysql
```

Start the MySQL service:

```bash
brew services start mysql
```

Verify MySQL is running:

```bash
mysql --version
```

### Step 2: Create the Database

Connect to MySQL (default installation has no root password):

```bash
mysql -u root
```

Inside the MySQL prompt, create the database:

```sql
CREATE DATABASE dawar_db;
EXIT;
```

**If you want to set a root password (optional but recommended):**

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Update Environment Variables

Update your `.env` file with the MySQL connection string.

**If you didn't set a password:**

```env
DATABASE_URL="mysql://root@localhost:3306/dawar_db"
```

**If you set a password:**

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/dawar_db"
```

**Important Notes:**
- The default MySQL port is `3306`
- Default username is `root`
- The database name should be `dawar_db` (or whatever you created in Step 2)

### Step 4: Run Prisma Migrations

Generate the Prisma Client:

```bash
npx prisma generate
```

Run the database migration to create all tables:

```bash
npx prisma migrate dev --name init
```

This will create:
- `MenuItem` table
- `Branch` table
- `JobApplication` table
- `Admin` table

### Step 5: Seed the Database

Populate the database with initial data:

```bash
npm run seed
```

This will add:
- 3 sample menu items (with real images from your website)
- 6 sample branches across Saudi cities
- 2 sample job applications

### Step 6: Verify Everything Works

1. **Open Prisma Studio** to view your data:
   ```bash
   npx prisma studio
   ```
   This opens a GUI at http://localhost:5555

2. **Visit the dashboard:**
   - Go to http://localhost:3000/dashboard
   - Login with:
     - Username: `admin`
     - Password: `admin123`

3. **Check all pages:**
   - Overview: Should show counts (3 menu items, 6 branches, 2 applications)
   - Menu: Should display 3 menu items
   - Branches: Should display 6 branches
   - Applications: Should display 2 applications

---

## Troubleshooting

### MySQL Connection Issues

If you get "Can't reach database server" errors:

1. **Check if MySQL is running:**
   ```bash
   brew services list | grep mysql
   ```

2. **Check the port:**
   ```bash
   lsof -i :3306
   ```

3. **Restart MySQL:**
   ```bash
   brew services restart mysql
   ```

4. **Test connection:**
   ```bash
   mysql -u root -p
   ```

### Authentication Errors

If you get "Access denied for user 'root'@'localhost'":

1. **Reset the root password:**
   ```bash
   mysql.server stop
   mysqld_safe --skip-grant-tables &
   mysql -u root
   ```
   
   Then in MySQL:
   ```sql
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   EXIT;
   ```

2. **Update your `.env` file** with the new password

### Migration Errors

If migrations fail:

1. **Reset the database:**
   ```bash
   npx prisma migrate reset
   ```

2. **Try again:**
   ```bash
   npx prisma migrate dev --name init
   ```

### Environment Variable Issues

If Prisma can't find environment variables:

1. **Check your `.env` file exists:**
   ```bash
   ls -la .env
   ```

2. **Verify the content:**
   ```bash
   cat .env | grep DATABASE_URL
   ```

3. **Make sure the URL format is correct:**
   ```
   mysql://username:password@host:port/database
   ```

---

## Next Steps After Setup

Once the database is set up and seeded:

1. **Test CRUD Operations:**
   - Add a new menu item
   - Edit a branch
   - Update an application status
   - Delete a test item

2. **Customize the Data:**
   - Replace sample menu items with real ones
   - Update branch information
   - Clear sample job applications

3. **Production Deployment:**
   - See `CMS_README.md` for production considerations
   - Consider using PlanetScale or AWS RDS for hosted MySQL
   - Implement proper authentication (NextAuth.js)
   - Set up file uploads for images and CVs

---

## Quick Reference

### Common Commands

```bash
# Start development server (Recommended)
./start-dev.sh

# OR start with explicit DATABASE_URL
DATABASE_URL="mysql://root@localhost:3306/dawar_db" npm run dev

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npm run seed

# Open Prisma Studio
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### MySQL Commands

```bash
# Start MySQL
brew services start mysql

# Stop MySQL
brew services stop mysql

# Restart MySQL
brew services restart mysql

# Connect to MySQL
mysql -u root -p

# Show databases
mysql -u root -e "SHOW DATABASES;"
```

### Dashboard URLs

- **Main Website:** http://localhost:3000
- **Login Page:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard
- **Menu Management:** http://localhost:3000/dashboard/menu
- **Branches:** http://localhost:3000/dashboard/branches
- **Applications:** http://localhost:3000/dashboard/applications

### Default Credentials

- **Username:** admin
- **Password:** admin123

---

## Support

If you encounter any issues:

1. Check the terminal for error messages
2. Review the troubleshooting section above
3. Check Prisma documentation: https://www.prisma.io/docs
4. Verify MySQL is running and accessible

---

**Happy coding! 🎉**
