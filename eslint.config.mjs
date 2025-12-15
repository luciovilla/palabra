import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "next",
        "prettier",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    )),

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
        prettier: fixupPluginRules(prettier),
    },

    rules: {
        "import/newline-after-import": "error",

        "import/order": ["error", {
            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },

            groups: [["builtin", "external"], ["parent", "sibling", "index"], "object"],
            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",
        }],
    },
}]);