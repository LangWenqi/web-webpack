// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'standard'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// 是否允许tabs
		"no-tabs": 0,
		// 是否允许tabs缩进
		'indent': ["off", "tab"],
    // 是否允许非空数组里面有多余的空格
    'arrow-parens': 0,
    // 生成器函数*的前后空格
    'generator-star-spacing': 0,
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', 'only-multiline'],
    // 语句强制分号结尾
    'semi': [2, "always"],
    // 禁用不必要的转义字符
    "no-useless-escape":0,
  },
}
