import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.jsx"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
        ...reactPlugin.configs["jsx-runtime"].rules,
        "react/prop-types": "off",
        "no-unused-vars": ["error", { "varsIgnorePattern": "^[A-Z_]" }]
    }
  },
  {
    files: ["src/main/**/*.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.jsx"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
        ...reactPlugin.configs["jsx-runtime"].rules,
        "react/prop-types": "off",
        "no-unused-vars": ["error", { "varsIgnorePattern": "^[A-Z_]" }]
    }
  },
  {
    files: ["src/main/**/*.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.jsx"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
        ...reactPlugin.configs["jsx-runtime"].rules,
        "react/prop-types": "off",
        "no-unused-vars": ["error", { "varsIgnorePattern": "^[A-Z_]" }]
    }
  },
  {
    files: ["src/main/**/*.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
