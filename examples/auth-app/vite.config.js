import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// A plain consumer app. React 19 is a real dependency here (the host app
// supplies it), satisfying monofly's peerDependency.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, open: true },
});
