const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'market-watch', 'page_impl.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the apostrophe in the string
const pattern = /body: 'Great analysis! I've noticed/;
const replacement = `body: "Great analysis! I've noticed`;

// Replace the content
content = content.replace(pattern, replacement);

// Make sure the string ends with double quotes as well
content = content.replace(/',$/, '",');

// Write back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated the market watch file!');
