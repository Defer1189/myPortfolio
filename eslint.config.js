// myPortfolio/eslint.config.js
import pluginCss from '@eslint/css';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
// import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJsdoc from 'eslint-plugin-jsdoc';
import pluginJsonc from 'eslint-plugin-jsonc';
import pluginMarkdown from 'eslint-plugin-markdown';
import pluginN from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import parserJsonc from 'jsonc-eslint-parser';

export default defineConfig([
    {
        ignores: [
            '**/package-lock.json',
            'node_modules/**',
            'dist/**',
            'build/**',
            '**/.env*',
            '**/*.local',
            '**/.husky/**',
            'client/src/assets/react.svg',
            'client/public/vite.svg',
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { jsdoc: pluginJsdoc, prettier: pluginPrettier, import: pluginImport },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.es2021 },
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...pluginJsdoc.configs['flat/recommended'].rules,
            'prettier/prettier': 'error',
            camelcase: ['error', { properties: 'never', ignoreDestructuring: false, allow: ['^UNSAFE_'] }],
            'new-cap': ['error', { newIsCap: true, capIsNew: true, properties: true }],
            'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],
            'no-throw-literal': 'error',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'spaced-comment': ['error', 'always', { line: { markers: ['/'] }, block: { balanced: true } }],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    caughtErrors: 'none',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                },
            ],
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            curly: ['error', 'all'],
            'no-alert': 'warn',
            'prefer-const': 'warn',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: '{react,react-dom}',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: './*.css',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: './assets/**/*.{svg,png,jpg}',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    'newlines-between': 'always-and-inside-groups',
                    alphabetize: { order: 'asc', caseInsensitive: true, orderImportKind: 'asc' },
                    warnOnUnassignedImports: true,
                },
            ],
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-absolute-path': 'error',
            'jsdoc/require-description': 'error',
            'jsdoc/check-param-names': 'error',
            'jsdoc/check-tag-names': ['error', { definedTags: ['swagger'] }],
            'jsdoc/tag-lines': [
                'error',
                'any',
                { startLines: 1, endLines: 1, tags: { example: { lines: 'always' }, description: { lines: 'never' } } },
            ],
            'jsdoc/no-undefined-types': 'error',
            'jsdoc/require-param-type': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-returns-type': 'error',
            'jsdoc/require-returns-description': 'error',
        },
    },
    {
        files: ['server/src/**/*.{js,mjs,cjs}', 'server/*.{js,mjs,cjs}'],
        plugins: { n: pluginN, prettier: pluginPrettier },
        languageOptions: { globals: { ...globals.node } },
        rules: {
            ...pluginN.configs['flat/recommended'].rules,
            'prettier/prettier': 'error',
            'n/no-missing-import': [
                'error',
                { allowModules: ['express', 'mongoose', 'cors', 'dotenv', 'swagger-jsdoc', 'swagger-ui-express'] },
            ],
            'n/no-unpublished-import': ['warn', { allowModules: ['nodemon'] }],
            'n/no-extraneous-import': [
                'error',
                { allowModules: ['express', 'mongoose', 'cors', 'dotenv', 'swagger-jsdoc', 'swagger-ui-express'] },
            ],
            'n/no-deprecated-api': 'error',
            'n/process-exit-as-throw': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'new-cap': [
                'error',
                {
                    newIsCap: true,
                    capIsNew: false,
                    properties: true,
                    capIsNewExceptions: ['Router'],
                },
            ],
        },
    },
    {
        files: ['client/src/**/*.{js,jsx}', 'client/*.{js,jsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            'react-refresh': pluginReactRefresh,
            prettier: pluginPrettier,
        },
        languageOptions: { globals: { ...globals.browser } },
        settings: { react: { version: 'detect' } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            'prettier/prettier': 'error',
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    caughtErrors: 'none',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^[A-Z_]',
                },
            ],
            'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-pascal-case': [
                'error',
                { allowAllCaps: true, allowNamespace: true, allowLeadingUnderscore: true },
            ],
            'react/prop-types': 'error',
            'react/display-name': 'warn',
            'no-console': 'warn',
        },
    },
    {
        files: ['**/*.json', '**/*.jsonc'],
        ignores: ['**/package.json', '**/.prettierrc.json'],
        plugins: { jsonc: pluginJsonc, prettier: pluginPrettier },
        languageOptions: { parser: parserJsonc },
        rules: {
            ...pluginJsonc.configs['flat/recommended-with-jsonc'].rules,
            'jsonc/sort-keys': ['error', { order: { type: 'asc', caseSensitive: false, natural: true } }],
            'jsonc/comma-style': 'error',
            'jsonc/no-dupe-keys': 'error',
            'jsonc/key-spacing': 'error',
            'jsonc/quotes': 'error',
            'jsonc/indent': ['error', 2],
            'prettier/prettier': 'off',
        },
    },
    {
        files: ['**/package.json'],
        plugins: { jsonc: pluginJsonc, prettier: pluginPrettier },
        languageOptions: { parser: parserJsonc },
        rules: {
            ...pluginJsonc.configs['flat/recommended-with-json'].rules,
            'jsonc/sort-keys': [
                'error',
                {
                    order: [
                        'name',
                        'version',
                        'private',
                        'description',
                        'keywords',
                        'homepage',
                        'bugs',
                        'repository',
                        'license',
                        'author',
                        'type',
                        'main',
                        'workspaces',
                        'module',
                        'exports',
                        'bin',
                        'files',
                        'scripts',
                        'husky',
                        'lint-staged',
                        'dependencies',
                        'devDependencies',
                        'peerDependencies',
                        'engines',
                    ],
                    pathPattern: '^$',
                },
            ],
            'jsonc/comma-style': 'error',
            'jsonc/no-dupe-keys': 'error',
            'jsonc/key-spacing': 'error',
            'jsonc/quotes': 'error',
            'jsonc/indent': ['error', 2],
            'prettier/prettier': 'off',
        },
    },
    {
        files: ['**/*.md'],
        plugins: { markdown: pluginMarkdown, prettier: pluginPrettier },
        processor: 'markdown/markdown',
        rules: {
            'prettier/prettier': ['error', { parser: 'markdown' }],
            'no-console': 'off',
            'no-unused-vars': 'off',
            'eol-last': 'off',
        },
    },
    {
        files: ['**/*.css'],
        plugins: { css: pluginCss, prettier: pluginPrettier },
        language: 'css/css',
        extends: ['css/recommended'],
        rules: {
            'prettier/prettier': 'error',
            'css/use-baseline': ['error', { available: 'newly' }],
            'css/no-invalid-at-rules': 'off',
        },
    },
    // eslintConfigPrettier,
]);
