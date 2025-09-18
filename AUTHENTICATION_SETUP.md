# Production-Ready NextAuth.js Authentication Setup

This guide walks you through setting up proper production-ready authentication using NextAuth.js with Prisma as the database adapter.

## 1. Database Configuration

### Update Prisma Schema

Replace your existing `schema.prisma` file with the NextAuth-compatible schema in `schema-nextauth.prisma`:

```bash
cp prisma/schema-nextauth.prisma prisma/schema.prisma
```

### Configure Database Connection

Add your database connection URL to your `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/my_agri_site"
```

For production, use your actual PostgreSQL database credentials. For local development, you can use:
- A local PostgreSQL instance
- A cloud database (like Supabase, Neon, or Railway)
- Docker container

### Apply Database Migration

Generate and apply the migration:

```bash
npx prisma migrate dev --name init-auth
```

## 2. NextAuth Configuration

### Update Environment Variables

Add these to your `.env` file:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

# Email Provider (optional for password reset)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@yourdomain.com
```

For production, generate a secure random string for `NEXTAUTH_SECRET`:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

### Update NextAuth API Route

Update your NextAuth configuration file at `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## 3. Create Admin User

Create a script to generate an admin user:

```javascript
// scripts/create-admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@example.com';
  const name = process.argv[3] || 'Administrator';
  let password = process.argv[4];

  if (!password) {
    console.log('No password provided. Generating random password...');
    password = Math.random().toString(36).slice(-10);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword,
        role: 'ADMIN'
      },
      create: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log(`Admin user created/updated successfully:`);
    console.log(`- Email: ${email}`);
    console.log(`- Name: ${name}`);
    console.log(`- Password: ${password}`);
    console.log(`- Role: ${user.role}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
```

Run the script to create an admin:

```bash
node scripts/create-admin.js "admin@example.com" "Administrator" "your-secure-password"
```

## 4. Update Types for TypeScript

Create or update the NextAuth types file:

```typescript
// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
```

## 5. Add Authentication Protection to Routes

### Create Middleware

Create a middleware file to protect routes:

```typescript
// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.nextauth.token;

    // Admin-only routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};
```

## 6. Create Authentication Components

### Create a Registration Form

Update or create a registration form component:

```typescript
// src/components/Auth/RegisterForm.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Redirect to login page after successful registration
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5016] focus:border-[#2D5016]"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5016] focus:border-[#2D5016]"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5016] focus:border-[#2D5016]"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5016] focus:border-[#2D5016]"
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-[#2D5016] hover:bg-[#2D5016]/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
```

### Create an API Route for Registration

Create an API route to handle user registration:

```typescript
// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });
    
    // Return success response (exclude password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: 'User registered successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}
```

## 7. Testing Your Authentication System

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login` to test login
3. Navigate to `/register` (create this page) to test registration
4. Test protected routes by trying to access `/admin` with and without admin privileges

## 8. Production Deployment

When deploying to production:

1. Use a strong, random `NEXTAUTH_SECRET` generated with proper entropy
2. Set `NEXTAUTH_URL` to your production URL
3. Configure secure database credentials
4. Set up secure SMTP for email verification and password reset
5. Consider adding additional authentication providers (Google, GitHub, etc.)

## Additional Security Considerations

1. **Rate limiting**: Implement rate limiting on login attempts
2. **HTTPS**: Ensure all traffic uses HTTPS
3. **CSRF protection**: NextAuth.js includes this, but verify it's working
4. **Password policies**: Enforce strong passwords
5. **MFA**: Consider adding multi-factor authentication

## Maintenance

Regularly:
- Update NextAuth.js and its dependencies
- Rotate secrets and credentials
- Monitor for suspicious activities
- Back up your user database
