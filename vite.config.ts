import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Real build/deploy date, injected at build time and shown in the footer's
// "Last updated" line so it reflects an actual deploy rather than the
// visitor's current date.
const BUILD_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const buildNow = new Date();
const BUILD_DATE = `${BUILD_MONTHS[buildNow.getMonth()]} ${buildNow.getFullYear()}`;

export default defineConfig(() => ({
  // For custom domain (https://gerryjr.dev), build as if site is at root "/"
  base: "/",
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
