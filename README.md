# 客户端 rss 阅读器

这是一个使用 Electron Forge 创建 Electron 应用程序的现代化模板存储库。它集成了 Bun 作为构建工具，提供了快速的开发体验和优化的项目结构。

## 主要框架

- [Electron Forge](https://www.electronforge.io/)：用于简化 Electron 应用的开发和打包流程。
- [Bun](https://bun.sh/)：用于快速构建 TypeScript 代码
- [drizzle orm](https://orm.drizzle.team/)：用于数据库操作的 TypeScript ORM
- [libSqlite](https://www.sqlite.org/index.html)：用于嵌入式数据库的 C 语言库

## ✨ 特性

- 🚀 使用 **Bun** 快速构建 TypeScript 代码
- ⚡ 基于 **Electron Forge** 的现代化开发流程
- 🔧 预配置的项目结构和开发环境
- 📱 仅支持 macOS 平台优化
- 📦 开箱即用的打包和分发配置
- 🔌 支持流行的 Electron Forge 插件

## 🏗️ 技术架构

### 构建系统

本项目采用 **Bun** 作为 TypeScript 构建工具，具有以下特点：

- 使用 Bun 编译 TypeScript 代码到 CommonJS 格式
- 目标环境设置为 Node.js（`target: 'node'`）
- 外部依赖 Electron 以避免打包冲突

### 运行环境说明

虽然我们使用 Bun 进行代码构建，但应用程序最终仍在 **Electron 的 Node.js 环境**中运行。因此：

- ✅ 使用 **dotenv** 管理环境变量（兼容 Node.js 环境）
- ✅ 所有 Node.js 模块和 API 都可正常使用
- ✅ Electron 主进程和渲染进程功能完整支持

## 📁 项目结构

```
electron-forge-template/
├── src/
│   ├── main.ts      # 主进程代码
│   ├── preload.ts   # 预加载脚本
│   └── build.ts     # Bun 构建配置
├── dist/            # 构建输出目录
├── public/          # 静态资源
├── forge.config.ts  # Electron Forge 配置
└── package.json     # 项目配置
```

## 📝 开发注意事项

1. **构建工具**: 使用 Bun 构建，享受快速编译体验
2. **运行环境**: 应用在 Electron 的 Node.js 环境中执行
3. **环境变量**: 使用 dotenv 确保与 Node.js 运行时的兼容性
4. **平台支持**: 当前配置仅支持 macOS 平台

## 🤝 贡献指南

欢迎提交 Issues 和 Pull Requests 来改进这个模板！

## 📄 许可证

MIT License

## 🚀 快速开始

```sh
bun install # 安装依赖
bun run generate # 生成 sqlite 数据库迁移文件
bun run migrate # 运行数据库迁移
bun dev # 启动应用
```
