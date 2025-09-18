const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'trusted-sellers', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find and update the getSellers function to transform data to match Seller interface
const transformedGetSellers = `async function getSellers() {
  const rawSellers = [
    {
      id: '1',
      name: 'Green Fields Farm Ltd.',
      location: {
        state: 'Lagos',
        city: 'Ikorodu',
        address: '25 Agric Road'
      },
      products: ['Rice', 'Cassava', 'Vegetables'],
      description: 'Family-owned farm with over 20 years of experience growing organic vegetables and staple crops.',
      contactInfo: {
        phone: '+234 801 234 5678',
        email: 'info@greenfields.ng',
        website: 'https://www.greenfields.ng'
      },
      verified: true,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae'
    },
    // ... other seller objects remain the same
  ];

  // Transform the data structure to match the Seller interface
  return rawSellers.map(seller => ({
    id: seller.id,
    name: seller.name,
    products: Array.isArray(seller.products) ? seller.products.join(', ') : '',
    state: seller.location.state,
    phone: seller.contactInfo.phone || '',
    email: seller.contactInfo.email || '',
    verified: seller.verified,
    description: seller.description,
    createdAt: new Date()
  }));
}`;

// Replace the original getSellers function
const getSellersFnRegex = /async function getSellers\(\)[^}]*}\s*\)/s;
content = content.replace(getSellersFnRegex, transformedGetSellers);

// Write back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated the trusted-sellers page!');
