#!/usr/bin/env node

console.log('Running retino.prettier.js ...');

(async () => {
  const { execSync } = await import('child_process');
  const prettier = await import('prettier'); // Import Prettier dynamically
  const fs = await import('fs');
  const path = await import('path');
  const glob = (await import('glob')).glob;

  // Ensure NODE_PATH includes the global node_modules for resolving plugins
  process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:/Users/krystofrehacek/.cache/pre-commit/repo_w6zxyfp/node_env-16.13.0/lib/node_modules/hook-retino-prettier/node_modules`;
  const module = await import('module');

  // Utility function to log environment details
  const logEnvironmentDetails = () => {
    console.log('... current directory:', execSync('pwd').toString().trim());
    console.log('... script location:', new URL(import.meta.url).pathname);
    console.log('... node location:', process.execPath);
    console.log('... NODE_PATH:', process.env.NODE_PATH || 'Not set');
  };

  logEnvironmentDetails();

  // Function to run Prettier
  const runPrettier = async () => {
    console.log('... loading Prettier configuration');

    const prettierConfig = JSON.parse(fs.readFileSync('./src/.prettierrc', 'utf-8'));

    // Match all HTML files
    const filesToFormat = glob.sync('**/*.html', {
      ignore: fs
        .readFileSync('./src/.prettierignore', 'utf-8')
        .split('\n')
        .filter(Boolean),
    });

    console.log(`... found ${filesToFormat.length} files to format`);

    for (const file of filesToFormat) {
      console.log(`... formatting ${file}`);
      const filePath = path.resolve(file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const formatted = await prettier.format(content, { ...prettierConfig, filepath: filePath });

      // Write the formatted content back to the file
      fs.writeFileSync(filePath, formatted, 'utf-8');
      console.log(`... formatted ${file}`);
    }

    console.log('... Prettier finished');
  };

  // Run Prettier
  await runPrettier();
})();
