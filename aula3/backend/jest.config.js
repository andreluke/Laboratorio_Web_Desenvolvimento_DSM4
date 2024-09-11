module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    moduleDirectories: ['node_modules', 'src'],
  };
  