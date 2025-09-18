const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Sellers', 'SellerList_impl.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Define the pattern to replace
const pattern = /\/\/ Format phone number\s*\n\s*const formatPhone[\s\S]*?return phone\.replace\([^;]*;\s*\n\s*\};/;

// Define the replacement
const replacement = `// Format phone number
  const formatPhone = (phone: string | undefined): string => {
    if (!phone) return "N/A";
    try {
      // Handle phone numbers safely
      return phone.replace(/(\\d{4})(\\d{3})(\\d{4})/, '$1 $2 $3');
    } catch (e) {
      // If any error occurs, return the original value
      return phone;
    }
  };`;

// Replace the content
content = content.replace(pattern, replacement);

// Write back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated the file!');
