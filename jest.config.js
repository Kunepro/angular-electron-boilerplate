module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/main/**/*.spec.ts'],
  roots: ['<rootDir>/src/main'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'src/main/tsconfig.test.json'
      }
    ]
  }
};
