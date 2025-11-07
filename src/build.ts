;(() => {
  Bun.build({
    entrypoints: ['./src/main.ts', './src/preload.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    external: ['electron'],
    env: 'inline',
    minify: false,
    define: {
      // 环境变量
      'process.env.ENV': JSON.stringify('development'),
      // 开发环境下前端地址
      'process.env.VITE_APP_FRONTEND_URL': JSON.stringify('http://localhost:3000'),
      // 邮件服务配置
      'process.env.MAIL_HOST': JSON.stringify('smtp.163.com'),
      'process.env.MAIL_PORT': JSON.stringify(465),
      'process.env.MAIL_USER': JSON.stringify('18267094443@163.com'),
      'process.env.MAIL_PASS': JSON.stringify('YFTv7Jkbzku7CNQu'), // 网易邮箱授权码，不要用我的，自己去申请一下，很快的，因为是有限额的
      // 数据库
      'process.env.DATABASE_URL': JSON.stringify('super-work-001.db'),
    },
  })
})()
