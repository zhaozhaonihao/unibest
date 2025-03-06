// 使用 import() 动态导入 @antfu/eslint-config，确保在 CommonJS (`.cjs`) 环境下可以使用
const antfuPromise = import('@antfu/eslint-config').then(module => module.default)

module.exports = antfuPromise.then(antfu =>
  antfu({
    // 配置类型为 "app"，表示针对应用程序优化 ESLint 规则
    type: 'app',

    // lessOpinionated: false 代表不采用 "过于武断" 的代码风格，允许开发者自定义部分规则
    lessOpinionated: false,

    // 代码风格规则
    stylistic: {
      indent: 2, // 使用 2 个空格进行缩进
      quotes: 'single', // 统一使用单引号 ''
    },

    // 启用 TypeScript 和 Vue 规则
    typescript: true, // 开启 TypeScript 规则支持
    vue: true, // 开启 Vue 3 规则支持

    // 忽略 ESLint 检查的文件和文件夹
    ignores: [
      '**/fixtures', // 测试用例文件夹
      '.commitlintrc.cjs', // 忽略 ESLint 对 commitlint 配置文件的检查
      'src/uni_modules/', // 忽略 UniApp 模块文件
      'node_modules',
      'dist',
      'build',
      'coverage', // 忽略构建和依赖目录
    ],

    // 指定文件格式化规则
    formatters: {
      css: true, // 允许格式化 CSS 文件
      html: true, // 允许格式化 HTML 文件
    },

    // ✅ **保留你的原始 ESLint 规则**
    rules: {
      // 'import/no-unresolved': 'off', // 关闭 import 规则，避免因 TypeScript 路径别名导致的未解析错误
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      // ], // 确保导入的 JS/TS 文件不需要加文件后缀（.js/.ts）
      'import/prefer-default-export': ['off'], // 允许使用多个具名导出（避免强制要求 default export）
      // 'import/no-extraneous-dependencies': 'off', // 关闭 "外部依赖" 检查，避免 import 时报错

      'no-console': ['off'], // 允许使用 `console.log()`，不限制调试输出
      // 'no-plusplus': 'off', // 允许 `++` 和 `--` 运算符
      // 'no-shadow': 'off', // 允许变量与外部作用域变量同名（避免 TypeScript 类型定义冲突）
      // 'vue/multi-word-component-names': 'off', // 允许 Vue 组件使用单个单词作为名称
      // '@typescript-eslint/no-explicit-any': 'off', // 允许使用 `any` 类型，避免强制类型检查
      // 'no-underscore-dangle': 'off', // 允许使用 `_` 开头的变量名，例如 `_id`
      // 'no-use-before-define': 'off', // 允许在声明前使用变量（TypeScript 已经做了类似检查）
      // 'no-undef': 'off', // 允许未定义变量（通常 TypeScript 会处理这个问题）
      // 'no-unused-vars': 'off', // 关闭未使用变量检查（TypeScript 会处理）
      // 'no-param-reassign': 'off', // 允许对函数参数重新赋值
      // '@typescript-eslint/no-unused-vars': 'off', // 关闭 TypeScript 对未使用变量的警告
      // 'no-redeclare': 'off', // 允许变量重复声明（TypeScript 可能会检查）
      'no-use-before-define': 'off', // 关闭 JavaScript 版的 no-use-before-define
      '@typescript-eslint/no-use-before-define': 'off', // 关闭 TypeScript 版的 no-use-before-define
      '@typescript-eslint/no-redeclare': 'error', // 但 TypeScript 内部不允许变量重复声明
    },

    // 解析 TypeScript 的 import 规则
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'], // 确保 `.ts` `.tsx` 文件可以被正确解析
      },
      'import/resolver': {
        typescript: {}, // 允许 import TypeScript 的路径别名（`tsconfig.json` 中的 `paths`）
      },
    },

    // **定义全局变量**（这些变量不会触发 ESLint 的 `no-undef` 错误）
    globals: {
      $t: true, // Vue i18n 翻译函数
      uni: true, // UniApp API
      UniApp: true, // UniApp 全局对象
      wx: true, // 微信小程序 API
      WechatMiniprogram: true, // 微信小程序命名空间
      getCurrentPages: true, // 微信小程序 API
      UniHelper: true, // UniApp 相关的帮助函数
      Page: true, // 微信小程序 Page 实例
      App: true, // 微信小程序 App 实例
      NodeJS: true, // Node.js 全局对象
    },

  }, {
    files: ['**/*.vue'], // 仅对 Vue 文件应用这些规则
    rules: {
      'vue/first-attribute-linebreak': 'off', // 完全禁用该规则
    },
  }),
)
