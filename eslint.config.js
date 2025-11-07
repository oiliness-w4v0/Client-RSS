import { antfu } from '@antfu/eslint-config'

export default antfu({
  // add your custom config here
  rules: {
    'node/prefer-global/process': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'object-curly-newline': ['error', {
      ObjectExpression: {
        multiline: true,
        minProperties: 2,
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 2,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 2,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 2,
      },
    }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
  },
})
