// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        // Password check logic here (bcrypt.compare)
        if (user) return user;
        return null;
      }
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.role = user.role; // make role available in session
      return session;
    }
  }
};

export default NextAuth(authOptions);
