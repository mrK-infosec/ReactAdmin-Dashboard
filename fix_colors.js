import fs from 'fs';

const fixColors = (file) => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.85\)/g, 'var(--text-primary)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.65\)/g, 'var(--text-secondary)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.45\)/g, 'var(--text-secondary)');
  
  content = content.replace(/#8c8c8c/g, 'var(--text-secondary)');
  content = content.replace(/#1f2937/g, 'var(--text-primary)');
  content = content.replace(/#374151/g, 'var(--text-primary)');
  content = content.replace(/#6b7280/g, 'var(--text-secondary)');
  
  fs.writeFileSync(file, content, 'utf8');
};

['src/styles/components.css', 'src/styles/pages.css'].forEach(fixColors);
console.log('Colors fixed!');
