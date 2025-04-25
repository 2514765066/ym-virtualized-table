import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({}),
    dts({
      entryRoot: "package",
      outDir: "es",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("package"),
    },
  },
  build: {
    target: "modules",
    outDir: "es",

    rollupOptions: {
      external: ["vue"],
      input: ["./package/index.ts"],
      output: [
        {
          format: "es",
          dir: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "package",
        },
      ],
    },

    lib: {
      entry: "./package/index.ts",
      formats: ["es"],
    },
  },
});
