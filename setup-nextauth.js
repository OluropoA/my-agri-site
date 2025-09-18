const fs = require('fs');
const path = require('path');

// Create .env.local if it doesn't exist
const envFilePath = path.join(__dirname, '.env.local');

const envContent = `# NextAuth Configuration
# For development only - use proper secrets in production

# Required NextAuth URL (defaults to http://localhost:3000)
NEXTAUTH_URL=http://localhost:3000

# Secret key for JWT encryption
NEXTAUTH_SECRET=dev-secret-do-not-use-in-production

# Database connection (comment out if using default adapter)
# DATABASE_URL=file:./dev.db

# Add any other auth provider credentials below
# GITHUB_ID=your-github-id
# GITHUB_SECRET=your-github-secret
`;

try {
  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, envContent);
    console.log('.env.local created successfully!');
  } else {
    console.log('.env.local already exists, updating with NextAuth settings...');
    
    // Read existing content
    const existingContent = fs.readFileSync(envFilePath, 'utf8');
    
    // Only add NextAuth settings if they don't exist
    if (!existingContent.includes('NEXTAUTH_URL')) {
      fs.writeFileSync(envFilePath, existingContent + '\n' + envContent);
      console.log('NextAuth settings added to .env.local!');
    } else {
      console.log('NextAuth settings already exist in .env.local');
    }
  }
} catch (err) {
  console.error('Error setting up .env.local:', err);
}
