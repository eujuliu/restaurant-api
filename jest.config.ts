import type { Config } from 'jest';
export default <Config>{
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
};
