import type { Config } from 'jest';
export default <Config>{
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  globalTeardown: './src/core/tests/teardown.ts',
  globalSetup: './src/core/tests/setup.ts',
};
