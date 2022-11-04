import type { Config } from 'jest';
export default <Config>{
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'src'],
};
