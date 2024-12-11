#!/usr/bin/env node

(async () => {
  const prettier = await import('prettier'); // Import Prettier dynamically
  const args = [
    '--config=./src/.prettierrc',
    '--ignore-path=./src/.prettierignore',
    '**/*.html',
  ];

  const { spawnSync } = await import('child_process');
  const result = spawnSync('npx', ['prettier', ...args], { stdio: 'inherit' });
  process.exit(result.status);
})();
