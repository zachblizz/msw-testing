const path = require("path");

module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ['**/**/*.test.js'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleDirectories: ['node_modules', path.join(__dirname, './src')],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve(
      'react-scripts/config/jest/babelTransform',
    ),
    '^.+\\.css$': require.resolve('react-scripts/config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
      'react-scripts/config/jest/fileTransform.js',
    ),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  resetMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!<rootDir>/node_modules/**/*',
    '!<rootDir>/src/test/**/*',
    '!<rootDir>/src/setupProxy*',
    '!<rootDir>/src/setupTests*',
    '!<rootDir>/src/dev-tools/**/*',
  ],
};
