// Script to generate placeholder images
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create a placeholder SVG for images
function createPlaceholderSVG(name, width = 1200, height = 630, color = '#2D5016') {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="32" text-anchor="middle" fill="white">${name}</text>
</svg>`;
  return svg;
}

// List of image files to create
const imagesToCreate = [
  { name: 'dr-apalowo-hero.jpg', color: '#2D5016' },
  { name: 'auth-header.jpg', color: '#2D5016' },
  { name: 'blog-header.jpg', color: '#006A4E' },
  { name: 'about-header.jpg', color: '#2D5016' },
  { name: 'contact-header.jpg', color: '#DAA520' },
  { name: 'market-watch-header.jpg', color: '#006A4E' },
  { name: 'research-header.jpg', color: '#2D5016' },
  { name: 'research-field.jpg', color: '#87A96B' },
  { name: 'sellers-header.jpg', color: '#8B4513' },
];

// Create each placeholder image
imagesToCreate.forEach(image => {
  const filePath = path.join(imagesDir, image.name);
  const svg = createPlaceholderSVG(image.name.replace('.jpg', ''), 1200, 630, image.color);
  
  // For a real project, we'd convert SVG to JPG,
  // but for a placeholder, we'll just write the SVG to the file
  fs.writeFileSync(filePath, svg);
  console.log(`Created placeholder for ${image.name}`);
});

console.log('All placeholder images created.');
