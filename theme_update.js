const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/layout.js',
  'src/app/page.js',
  'src/app/settings/page.js',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/MovieCard.jsx',
  'src/components/MovieModal.jsx',
  'src/components/AuthModals.jsx',
  'src/components/ThemeToggle.jsx'
];

const replacements = [
  { search: /bg-\[\#F1F7ED\]/g, replace: 'bg-slate-50 dark:bg-zinc-950' },
  { search: /bg-\[\#243E36\]/g, replace: 'bg-white dark:bg-zinc-900' },
  { search: /bg-\[\#E0EEC6\]/g, replace: 'bg-slate-100 dark:bg-zinc-800' },
  { search: /bg-\[\#9F915A\]/g, replace: 'bg-[#D4AF37] dark:bg-[#E50914]' },
  { search: /text-\[\#243E36\]/g, replace: 'text-slate-900 dark:text-white' },
  { search: /border-\[\#243E36\]/g, replace: 'border-slate-200 dark:border-zinc-800' },
  { search: /border-\[\#9F915A\]/g, replace: 'border-[#D4AF37] dark:border-[#E50914]' },
  { search: /text-\[\#9F915A\]/g, replace: 'text-[#D4AF37] dark:text-[#E50914]' },
  { search: /focus-visible\:ring-\[\#9F915A\]/g, replace: 'focus-visible:ring-[#D4AF37] dark:focus-visible:ring-[#E50914]' },
  { search: /focus\:ring-\[\#9F915A\]/g, replace: 'focus:ring-[#D4AF37] dark:focus:ring-[#E50914]' },
  { search: /hover\:bg-\[\#9F915A\]/g, replace: 'hover:bg-[#D4AF37] dark:hover:bg-[#E50914]' },
  { search: /hover\:bg-\[\#243E36\]/g, replace: 'hover:bg-slate-100 dark:hover:bg-zinc-800' },
  // specific text color fixes for navbar and footer since their backgrounds changed from dark to light
  { search: /text-white\/90/g, replace: 'text-slate-600 dark:text-slate-300' },
  { search: /text-white\/80/g, replace: 'text-slate-500 dark:text-slate-400' },
];

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  
  // Specific fixes for text-white on newly white backgrounds
  if (file === 'src/components/Navbar.jsx' || file === 'src/components/Footer.jsx' || file === 'src/components/MovieModal.jsx' || file === 'src/components/AuthModals.jsx') {
    // We only want to replace text-white if it's on a background that changed to white.
    // Actually, in Navbar, "text-white" in the title span should be "text-slate-900 dark:text-white"
    content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
    // But this will break text-white inside buttons (which have bg-[#D4AF37] dark:bg-[#E50914]).
    // We will fix those buttons back to text-white.
    content = content.replace(/bg-\[\#D4AF37\] dark\:bg-\[\#E50914\]([^>]*)text-slate-900 dark\:text-white/g, 'bg-[#D4AF37] dark:bg-[#E50914]$1text-white');
  }

  fs.writeFileSync(filePath, content);
}

console.log("Theme update complete!");
