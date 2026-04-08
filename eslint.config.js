import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            js,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node
            }
        },
        extends: ["js/recommended"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "semi": "error",
            "prefer-const": "error",
            "quotes": ["error", "double", { "allowTemplateLiterals": true }],
            "eqeqeq": "error"
        },
    },

    {
        files: ["**/*.js"],
        ignores: ["tests"]
    }
]);
