// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Mock admin user for development
const mockUsers = [
  {
    id: "1",
    name: "Dr. Oluropo Apalowo",
    email: "oluropo.apalowo@unizik.edu.ng",
    password: "demopassword", // In production, this would be hashed
    role: "ADMIN"
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123", 
    role: "USER"
  }
];

export const authOptions: NextAuthOptions = {
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

        // Find user by email (in production this would query a database)
        const user = mockUsers.find(user => user.email === credentials.email);

        // Check if user exists and password matches
        if (!user || user.password !== credentials.password) {
          console.log("Invalid credentials");
          throw new Error("Invalid email or password");
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add user properties to token on sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Add token properties to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        // Make sure email is set
        if (token.email) session.user.email = token.email as string;
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
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-do-not-use-in-production"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
