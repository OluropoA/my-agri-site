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
