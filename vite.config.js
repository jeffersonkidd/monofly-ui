import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import path from "path";
import { defineConfig } from "vite";

// Library mode: emit a single ESM bundle + one CSS file, with React kept
// external so Figma Make (and any host app) supplies its own copy via esm.sh.

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      blocks: path.resolve(__dirname, "./src/ui/blocks"),      
      compositions: path.resolve(__dirname, "./src/ui/compositions"),
      data: path.resolve(__dirname, "./src/data"),
      hooks: path.resolve(__dirname, "./src/ui/hooks"),
      icons: path.resolve(__dirname, "./src/ui/icons"),
      images: path.resolve(__dirname, "./src/ui/images"),
      layout: path.resolve(__dirname, "./src/ui/layout"),
      primitives: path.resolve(__dirname, "./src/ui/primitives"),
      templates: path.resolve(__dirname, "./src/ui/templates"),
      utils: path.resolve(__dirname, "./src/ui/utils"),
    },
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
