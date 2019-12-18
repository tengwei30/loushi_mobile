module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 'error', // https://eslint.cn/docs/rules/eqeqeq
    'no-void': 'error', // https://eslint.cn/docs/rules/no-void
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
