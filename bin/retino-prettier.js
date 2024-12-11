#!/usr/bin/env node

console.log('Running retino.prettier.js ...');

(async () => {
  // echo current directory
  const { execSync } = await import('child_process');
  const cwd = execSync('pwd').toString().trim();

  // echo script location
  const __filename = new URL(import.meta.url).pathname;
  console.log('... script location:', __filename);

  console.log('... current directory:', cwd);

  // echo file contents noop.js
  const fs = await import('fs');
  const file = fs.readFileSync(__filename, 'utf8');
  console.log('... file contents:', file);

  console.log('... loading Prettier');

  const prettier = await import('prettier'); // Import Prettier dynamically

  console.log('... loaded Prettier');

  const args = [
    '--config=./src/.prettierrc',
    '--ignore-path=./src/.prettierignore',
    '**/*.html',
  ];

  const { spawnSync } = await import('child_process');
  const result = spawnSync('npx', ['prettier', ...args], { stdio: 'inherit' });

  console.log('... Prettier finished');

  process.exit(result.status);

  console.log('... exiting');
})();
