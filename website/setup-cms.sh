#!/bin/bash

# CMS Dashboard Setup Script
echo "🚀 Setting up CMS Dashboard for Dawar Al Saada"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env file..."
    echo ""
    echo "Please enter your MySQL credentials:"
    read -p "MySQL Username (default: root): " mysql_user
    mysql_user=${mysql_user:-root}
    
    read -sp "MySQL Password: " mysql_pass
    echo ""
    
    read -p "Database Name (default: dawar_db): " db_name
    db_name=${db_name:-dawar_db}
    
    # Create .env file
    echo "DATABASE_URL=\"mysql://${mysql_user}:${mysql_pass}@localhost:3306/${db_name}\"" > .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Generating Prisma Client..."
npx prisma generate

echo ""
echo "📊 Running database migrations..."
npx prisma migrate dev --name init

echo ""
read -p "Do you want to seed the database with sample data? (y/n): " seed_choice
if [ "$seed_choice" = "y" ] || [ "$seed_choice" = "Y" ]; then
    echo "🌱 Seeding database..."
    npm run seed
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Visit http://localhost:3000 for the website"
echo "   3. Visit http://localhost:3000/login for the dashboard"
echo "   4. Login with: admin / admin123"
echo ""
echo "📚 Check CMS_README.md for more information"
