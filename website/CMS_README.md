# CMS Dashboard - Dawar Al Saada

A comprehensive Content Management System (CMS) dashboard for managing the Dawar Al Saada website.

## Features

- **Menu Management**: Add, edit, and delete menu items with images, ratings, and popularity flags
- **Branch Management**: Manage restaurant branches across different cities
- **Job Applications**: View and manage job applications with status tracking
- **Dashboard Overview**: Quick stats and insights

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS
- **Backend**: Next.js Server Actions
- **Database**: MySQL with Prisma ORM
- **Authentication**: Simple localStorage-based auth (upgrade to NextAuth.js for production)

## Database Setup

### 1. Install MySQL

Install MySQL using Homebrew:

```bash
brew install mysql
```

Start the MySQL service:

```bash
brew services start mysql
```

### 2. Create Database

Connect to MySQL:

```bash
mysql -u root
```

Inside the MySQL prompt, create the database:

```sql
CREATE DATABASE dawar_db;
EXIT;
```

### 3. Configure Environment Variables

Update your `.env` file with your MySQL connection string:

```env
DATABASE_URL="mysql://root@localhost:3306/dawar_db"
```

**Note:** 
- If you set a root password, use: `mysql://root:your_password@localhost:3306/dawar_db`
- The default MySQL port is `3306`
- The database name should be `dawar_db`

### 4. Run Migrations

Generate the Prisma Client:

```bash
npx prisma generate
```

Run the database migration:

```bash
npx prisma migrate dev --name init
```

### 5. Seed Initial Data

```bash
npm run seed
```

## Running the Application

### Development Mode

**Option 1: Using the startup script (Recommended)**

```bash
./start-dev.sh
```

**Option 2: Using npm directly**

```bash
DATABASE_URL="mysql://root@localhost:3306/dawar_db" npm run dev
```

**Note:** The startup script (`start-dev.sh`) properly loads environment variables from `.env` before starting the dev server.

Visit:
- **Website**: http://localhost:3000
- **Dashboard Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

### Login Credentials (Demo)

- **Username**: admin
- **Password**: admin123

## Dashboard Routes

- `/dashboard` - Overview with statistics
- `/dashboard/menu` - Menu items management
- `/dashboard/branches` - Branch locations management
- `/dashboard/applications` - Job applications management

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Production Considerations

Before deploying to production, consider:

1. **Authentication**: Replace localStorage auth with NextAuth.js or similar
2. **File Uploads**: Implement proper file upload for menu images and CVs (use AWS S3, Cloudinary, etc.)
3. **Environment Variables**: Use proper environment variable management
4. **Database**: Use a production MySQL instance (PlanetScale, AWS RDS, etc.)
5. **Validation**: Add server-side validation for all forms
6. **Error Handling**: Implement comprehensive error handling
7. **Rate Limiting**: Add rate limiting to prevent abuse
8. **HTTPS**: Ensure all connections use HTTPS
9. **Backup**: Set up automated database backups

## Project Structure

```
website/
├── app/
│   ├── actions/          # Server actions
│   │   ├── menu.js
│   │   ├── branches.js
│   │   └── applications.js
│   ├── dashboard/        # Dashboard pages
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── menu/
│   │   ├── branches/
│   │   └── applications/
│   ├── login/
│   └── page.js           # Main website
├── components/           # React components
├── lib/
│   └── prisma.js        # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## License

Private - Dawar Al Saada
