import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper:{"^uuid$": "uuid"},
  setupFiles: ['./jest.polyfills.js'],
}

export default createJestConfig(config)
