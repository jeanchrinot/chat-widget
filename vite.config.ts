import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// import singleFile from 'vite-plugin-singlefile';
// import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

// export default defineConfig({
//   // build: {
//   //   target: "esnext", // Ensures modern syntax for smaller file sizes
//   //   cssCodeSplit: false, // Ensures CSS is included in the JS bundle
//   //   rollupOptions: {
//   //     output: {
//   //       inlineDynamicImports: true, // Ensures everything is in one file
//   //       manualChunks: () => "chat-widget.js", // Avoid chunking
//   //     },
//   //   },
//   // },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   plugins: [react(), viteSingleFile()],
// })
