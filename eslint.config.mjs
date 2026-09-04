import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", ".astro/", "public/"],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginJsonc.configs["flat/recommended-with-json"],
  // tsconfig.json allows comments by convention
  {
    files: ["tsconfig*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
  },
  eslintConfigPrettier,
  // Astro env.d.ts uses triple-slash references by convention
  {
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  // CJS config files use require() by design
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
