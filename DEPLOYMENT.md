# Deployment Guide for Dr. Oluropo Apalowo's Agricultural Research Website

This document provides instructions for deploying the agricultural research website to different environments.

## Environment Setup

The application requires several environment variables to function properly. We've included a setup script to help you configure these variables.

### Using the Environment Setup Script

1. Run the setup script:
   ```bash
   npm run setup-env
   ```

2. Follow the prompts to configure your environment variables. Default values are provided in parentheses.

3. The script will create a `.env` file with your configuration.

The script will automatically generate a secure secret for NextAuth and configure the following variables:

```
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/agri_site_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="automatically-generated-secure-secret"

# Admin User (for initial setup)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"

# Email Service (for contact form)
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_FROM="no-reply@yourdomain.com"

# API Keys
NEXT_PUBLIC_MAPS_API_KEY="your-google-maps-api-key"
```

### Manual Configuration

If you prefer to set up your environment variables manually, you can copy the `env.example.txt` file to a new `.env` file and edit the values directly:

## Development Environment

To run the application in development mode:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables by creating a `.env.local` file
4. Initialize the database:
   ```
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```
   npm run dev
   ```
6. Access the application at `http://localhost:3000`

## Production Deployment

### Option 1: Vercel (Recommended)

The easiest way to deploy this application is through [Vercel](https://vercel.com), the creators of Next.js.

1. Create an account on Vercel and connect to your GitHub repository
2. Import the project
3. Configure environment variables in the Vercel dashboard
4. Deploy the application

Vercel will automatically handle the build process and deployment.

### Option 2: Self-hosted Server

To deploy to a self-hosted server:

1. Build the application:
   ```
   npm run build
   ```
2. Start the server:
   ```
   npm run start
   ```

For production deployments, consider using a process manager like PM2:

```
# Install PM2
npm install -g pm2

# Start the application with PM2
pm2 start npm --name "agri-site" -- start

# Save the PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

### Option 3: Docker Deployment

A Dockerfile is included for containerized deployment:

1. Build the Docker image:
   ```
   docker build -t agri-site .
   ```
2. Run the container:
   ```
   docker run -p 3000:3000 --env-file .env.local agri-site
   ```

For production, consider using Docker Compose for managing the application and database containers together.

## Database Management

The application uses Prisma ORM with a PostgreSQL database. For database migrations:

1. Make changes to the Prisma schema (`prisma/schema.prisma`)
2. Generate a migration:
   ```
   npx prisma migrate dev --name descriptive-name
   ```
3. Apply the migration to production:
   ```
   npx prisma migrate deploy
   ```

## Content Management

After deployment, use the admin dashboard to manage content:

1. Access `/admin` route
2. Log in with admin credentials
3. Use the dashboard to manage blog posts, market watch data, and trusted sellers

## Troubleshooting

Common issues and solutions:

- **Database connection errors**: Verify your DATABASE_URL is correct and the database server is accessible
- **Authentication errors**: Ensure NEXTAUTH_SECRET and NEXTAUTH_URL are properly configured
- **Email sending failures**: Check your email service configuration

## Maintenance

Regular maintenance tasks:

1. Keep dependencies updated:
   ```
   npm update
   ```
2. Monitor server logs for errors
3. Regularly back up the database
4. Update content through the admin dashboard

## Support

For questions or issues with deployment, please contact the development team.
