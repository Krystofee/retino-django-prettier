#!/usr/bin/env node

console.log('Running retino.prettier.js ...');

(async () => {
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
