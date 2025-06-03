import { defineConfig } from "vite";

export default defineConfig({
  base: "/todo-contacts-list/", // ← важно!
  plugins: [],
  build: {
    outDir: "dist",
  },
});
