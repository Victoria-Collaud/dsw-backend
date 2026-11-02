import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.{js,ts}'], // 👈 incluye .js y la carpeta correcta
  },
});