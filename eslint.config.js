import { antfu } from '@antfu/eslint-config'

export default antfu({
  // add your custom config here
  rules: {
    'node/prefer-global/process': 'off',
  },
})
