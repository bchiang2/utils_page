export default {
  // Format all supported files with Prettier
  '*': ['prettier --write --ignore-unknown'],

  // Run ESLint on TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],

  // Format JSON files
  '*.json': ['prettier --write'],

  // Format CSS files
  '*.{css,scss}': ['prettier --write'],

  // Format Markdown files
  '*.md': ['prettier --write'],
};
