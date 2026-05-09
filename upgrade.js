import fs from 'fs';

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');

  // Convert light colors to dark theme variables
  content = content.replace(/background: var\(--white\);/g, 'background: var(--glass-bg);\n  backdrop-filter: var(--glass-blur);');
  content = content.replace(/background: rgba\(255, 255, 255, 0\.8\);/g, 'background: var(--glass-bg);');
  content = content.replace(/background: rgba\(255, 255, 255, 0\.9\);/g, 'background: var(--glass-bg);');
  content = content.replace(/background: white;/g, 'background: var(--glass-bg);\n  backdrop-filter: var(--glass-blur);\n  border: 1px solid var(--glass-border);');
  content = content.replace(/background-color: white;/g, 'background-color: var(--glass-bg);\n  backdrop-filter: var(--glass-blur);');
  content = content.replace(/background: #fff;/g, 'background: var(--glass-bg);\n  backdrop-filter: var(--glass-blur);\n  border: 1px solid var(--glass-border);');
  
  content = content.replace(/border-bottom: 1px solid rgba\(255, 255, 255, 0\.3\);/g, 'border-bottom: 1px solid var(--glass-border);');
  
  content = content.replace(/#1f2937/g, 'var(--text-primary)');
  content = content.replace(/#374151/g, 'var(--text-primary)');
  content = content.replace(/#6b7280/g, 'var(--text-secondary)');
  content = content.replace(/#8c8c8c/g, 'var(--text-secondary)');
  
  content = content.replace(/#e5e7eb/g, 'var(--border-color)');
  content = content.replace(/#d1d5db/g, 'var(--border-color)');
  content = content.replace(/#d9d9d9/g, 'var(--border-color)');
  content = content.replace(/#f0f0f0/g, 'var(--border-color)');
  
  content = content.replace(/#f3f4f6/g, 'rgba(255,255,255,0.1)');
  content = content.replace(/#f5f5f5/g, 'rgba(255,255,255,0.05)');
  content = content.replace(/#fafafa/g, 'transparent');
  content = content.replace(/#f0f2f5/g, 'transparent');
  
  content = content.replace(/rgba\(0, 0, 0, 0\.85\)/g, 'var(--text-primary)');
  content = content.replace(/rgba\(0, 0, 0, 0\.65\)/g, 'var(--text-secondary)');
  content = content.replace(/rgba\(0, 0, 0, 0\.45\)/g, 'var(--text-secondary)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.1[0-9]*\)/g, 'rgba(0,0,0,0.5)');
  content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.0[0-9]*\)/g, 'rgba(0,0,0,0.3)');
  
  content = content.replace(/color: #fff;/g, 'color: var(--text-primary);');
  content = content.replace(/color: white;/g, 'color: var(--text-primary);');

  content = content.replace(/background-color: #e5e7eb/g, 'background-color: rgba(255,255,255,0.1)');
  
  // Custom tweaks for components and pages
  content = content.replace(/box-shadow: 0 4px 30px rgba\(0, 0, 0, 0\.03\);/g, 'box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);');
  content = content.replace(/border-left: 4px solid/g, 'border-bottom: 4px solid'); // Make stats card glow from bottom maybe, just a tweak
  
  fs.writeFileSync(file, content, 'utf8');
};

['src/styles/components.css', 'src/styles/pages.css'].forEach(replaceInFile);
console.log('CSS updated successfully!');
