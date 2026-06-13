import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import path from "path";
import { defineConfig } from "vite";
 
// Library mode: emit a single ESM bundle + one CSS file, with React kept
// external so Figma Make (and any host app) supplies its own copy via esm.sh.
 
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^primitives\/(.*)/, replacement: path.resolve(__dirname, "./src/ui/primitives/$1") },
      { find: "blocks", replacement: path.resolve(__dirname, "./src/ui/blocks") },
      { find: "compositions", replacement: path.resolve(__dirname, "./src/ui/compositions") },
      { find: "data", replacement: path.resolve(__dirname, "./src/data") },
      { find: "hooks", replacement: path.resolve(__dirname, "./src/ui/hooks") },
      { find: "icons", replacement: path.resolve(__dirname, "./src/ui/icons") },
      { find: "images", replacement: path.resolve(__dirname, "./src/ui/images") },
      { find: "layout", replacement: path.resolve(__dirname, "./src/ui/layout") },
      { find: "primitives", replacement: path.resolve(__dirname, "./src/ui/primitives") },
      { find: "templates", replacement: path.resolve(__dirname, "./src/ui/templates") },
      { find: "lib", replacement: path.resolve(__dirname, "./src/ui/lib") },
    ],
  },
  server: {
    port: 8000,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
 