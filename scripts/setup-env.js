#!/usr/bin/env node

/**
 * Environment Variables Setup Script
 * 
 * This script helps create and configure the environment variables needed
 * for the agricultural research website.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to .env file
const envFilePath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example.txt');

// Generate a secure random string for NEXTAUTH_SECRET
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Default values
const defaults = {
  DATABASE_URL: 'postgresql://username:password@localhost:5432/agri_site_db',
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: generateSecret(),
  ADMIN_EMAIL: 'admin@example.com',
  ADMIN_PASSWORD: 'change-this-password',
  EMAIL_SERVER_USER: 'your-email@example.com',
  EMAIL_SERVER_PASSWORD: 'your-email-password',
  EMAIL_SERVER_HOST: 'smtp.example.com',
  EMAIL_SERVER_PORT: '587',
  EMAIL_FROM: 'no-reply@yourdomain.com',
  NEXT_PUBLIC_MAPS_API_KEY: '',
  NODE_ENV: 'development'
};

// Questions to ask
const questions = [
  {
    key: 'DATABASE_URL',
    question: 'Database URL (PostgreSQL connection string):',
    default: defaults.DATABASE_URL
  },
  {
    key: 'NEXTAUTH_URL',
    question: 'NextAuth URL (your site URL):',
    default: defaults.NEXTAUTH_URL
  },
  {
    key: 'ADMIN_EMAIL',
    question: 'Admin email address:',
    default: defaults.ADMIN_EMAIL
  },
  {
    key: 'ADMIN_PASSWORD',
    question: 'Initial admin password:',
    default: defaults.ADMIN_PASSWORD
  },
  {
    key: 'EMAIL_SERVER_USER',
    question: 'Email server username:',
    default: defaults.EMAIL_SERVER_USER
  },
  {
    key: 'EMAIL_SERVER_PASSWORD',
    question: 'Email server password:',
    default: defaults.EMAIL_SERVER_PASSWORD
  },
  {
    key: 'EMAIL_SERVER_HOST',
    question: 'Email server host:',
    default: defaults.EMAIL_SERVER_HOST
  },
  {
    key: 'EMAIL_SERVER_PORT',
    question: 'Email server port:',
    default: defaults.EMAIL_SERVER_PORT
  },
  {
    key: 'EMAIL_FROM',
    question: 'Email from address:',
    default: defaults.EMAIL_FROM
  },
  {
    key: 'NEXT_PUBLIC_MAPS_API_KEY',
    question: 'Google Maps API Key (optional):',
    default: defaults.NEXT_PUBLIC_MAPS_API_KEY
  }
];

// Check if env.example.txt exists, if not, create it
if (!fs.existsSync(envExamplePath)) {
  console.log('Creating env.example.txt file...');
  let exampleContent = '';
  Object.keys(defaults).forEach(key => {
    exampleContent += `${key}="${defaults[key]}"\n`;
  });
  fs.writeFileSync(envExamplePath, exampleContent);
  console.log('env.example.txt created successfully!');
}

console.log('\n========================================');
console.log('Environment Variables Setup');
console.log('========================================');
console.log('\nThis script will help you set up the environment variables for the agricultural research website.');
console.log('Press Enter to use the default value shown in parentheses.\n');

// Check if .env file already exists
if (fs.existsSync(envFilePath)) {
  rl.question('A .env file already exists. Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      askQuestions();
    } else {
      console.log('\nSetup canceled. Existing .env file was not modified.');
      rl.close();
    }
  });
} else {
  askQuestions();
}

function askQuestions() {
  const answers = {};
  let currentQuestionIndex = 0;

  // Set the NEXTAUTH_SECRET automatically
  answers.NEXTAUTH_SECRET = defaults.NEXTAUTH_SECRET;
  
  const askNextQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      // All questions answered, create .env file
      createEnvFile(answers);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    rl.question(`${currentQuestion.question} (${currentQuestion.default}): `, (answer) => {
      answers[currentQuestion.key] = answer.trim() || currentQuestion.default;
      currentQuestionIndex++;
      askNextQuestion();
    });
  };

  askNextQuestion();
}

function createEnvFile(answers) {
  let envContent = '';
  
  // Add all answers
  Object.keys(answers).forEach(key => {
    envContent += `${key}="${answers[key]}"\n`;
  });
  
  // Add NODE_ENV
  envContent += `NODE_ENV="${defaults.NODE_ENV}"\n`;

  // Write to .env file
  fs.writeFileSync(envFilePath, envContent);
  
  console.log('\n========================================');
  console.log('.env file created successfully!');
  console.log('========================================');
  console.log('\nYour environment variables are now set up. You may need to restart your development server for changes to take effect.');
  console.log('\nImportant: Keep your .env file secure and never commit it to version control.');
  console.log('\nIf you need to update these settings in the future, run this script again or edit the .env file directly.');
  
  rl.close();
}

rl.on('close', () => {
  process.exit(0);
});
