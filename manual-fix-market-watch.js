const fs = require('fs');

const filePath = 'src/app/market-watch/page_impl.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the entire line
const badLine = 'body: "Great analysis! I\'ve noticed similar trends in the eastern markets, especially with cassava prices. The industrial demand is really changing the dynamics for smallholders.\',';
const fixedLine = 'body: "Great analysis! I\'ve noticed similar trends in the eastern markets, especially with cassava prices. The industrial demand is really changing the dynamics for smallholders.",';

content = content.replace(badLine, fixedLine);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Manual fix completed!');
