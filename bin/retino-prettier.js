#!/usr/bin/env node

const requiredVersion = 'v16.13.0';
if (process.version !== requiredVersion) {
  console.error(`Error: Node.js ${requiredVersion} is required. Current version: ${process.version}`);
  process.exit(1);
}

const { spawnSync } = require('child_process');

// Customize arguments as needed. For your case:
const args = [
  'prettier',
  '--config=./src/.prettierrc',
  '--ignore-path=./src/.prettierignore',
  '**/*.html'
];

const result = spawnSync('npx', args, { stdio: 'inherit' });
process.exit(result.status);
