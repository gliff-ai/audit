import { defineConfig } from "vite";
const path = require("path");
import { ViteAliases } from "vite-aliases";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false, // TODO maybe?
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "@gliff-ai/manage",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "@mui/material",
        "@mui/icons-material",
        "@mui/styles",
        "@mui/system",
        "@emotion/react",
        "@emotion/styled",
        "@gliff-ai/style",
      ],
      output: {
        globals: {},
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  plugins: [ViteAliases(), checker({ typescript: true } /** TS options */)],
});
