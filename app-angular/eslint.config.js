import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
    // Base config for all files
    js.configs.recommended,

    // TypeScript and Angular configuration
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            '@angular-eslint': angular.tsPlugin,
            'import': importPlugin,
        },
        processor: angular.processInlineTemplates,
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx']
                }
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            }
        },
        rules: {
            // Base TypeScript rules
            ...tseslint.configs.recommended[1].rules,

            // Angular rules
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/no-empty-lifecycle-method': 'error',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/use-pipe-transform-interface': 'error',

            // Custom TypeScript rules
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'error',

            // General rules
            'no-unused-vars': 'off',
            'no-console': 'warn',
            'no-debugger': 'error',
            'prefer-const': 'error',
            'no-var': 'error',

            // Import rules
            'import/no-unresolved': 'error',
            'import/no-extraneous-dependencies': 'error',
            'import/no-duplicates': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index'
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    }
                }
            ],
            'import/newline-after-import': 'error',
            'import/no-default-export': 'off',
        },
    },

    // HTML template configuration
    {
        files: ['**/*.html'],
        languageOptions: {
            parser: angular.templateParser,
        },
        plugins: {
            '@angular-eslint/template': angular.templatePlugin,
        },
        rules: {
            // Angular template rules
            '@angular-eslint/template/no-duplicate-attributes': 'error',
            '@angular-eslint/template/no-negated-async': 'error',
            '@angular-eslint/template/use-track-by-function': 'warn',
            '@angular-eslint/template/conditional-complexity': [
                'error',
                { maxComplexity: 5 }
            ],
            '@angular-eslint/template/cyclomatic-complexity': 'off',
        },
    },

    // Global ignores
    {
        ignores: [
            'dist/',
            'node_modules/',
            'coverage/',
            '**/*.js',
            '**/*.d.ts',
            'src/assets/js/',
            'src/assets/vendors/',
        ],
    },
];
