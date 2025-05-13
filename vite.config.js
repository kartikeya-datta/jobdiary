import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ensures external/Docker access
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost', // or 'host.docker.internal' if inside Docker
      port: 3000,
    },
    overlay: false,
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
});
