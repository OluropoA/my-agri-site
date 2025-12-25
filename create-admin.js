// Test script to verify database connection and create admin user
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing database connection...');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully!');

        // Create admin user
        const hashedPassword = await bcrypt.hash('EnioluwaZenithA', 10);

        const user = await prisma.user.create({
            data: {
                name: 'Ropo Apalowo',
                email: 'mtimropo@gmail.com',
                password: hashedPassword,
                role: 'ADMIN', // Create as ADMIN directly
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', user.email);
        console.log('Role:', user.role);
        console.log('\nYou can now login at http://localhost:3000/login');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
