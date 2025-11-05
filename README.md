# electron-forge-template

这是一个使用 Electron Forge 创建 Electron 应用程序的现代化模板存储库。它集成了 Bun 作为构建工具，提供了快速的开发体验和优化的项目结构。

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

## 🚀 快速开始

### 安装依赖

```bash
# 使用 bun 安装依赖
bun install
```

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

## 🔧 环境变量配置

项目使用 `dotenv` 来管理环境变量。在项目根目录创建 `.env` 文件：

```env
# .env
NODE_ENV=development
APP_NAME=MyElectronApp
# 其他环境变量...
```

在代码中使用：

```typescript
import 'dotenv/config'

const appName = process.env.APP_NAME
const isDev = process.env.NODE_ENV === 'development'
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

## 代办

1. z-index 的定位优先级需要再确认和明确
2. 邮件发送历史记录功能
3. 应用日志的记录
4. 通讯录的优化

## 如何运行

```sh
bun install # 安装依赖
bun run generate # 生成 sqlite 数据库迁移文件
bun run migrate # 运行数据库迁移
bun dev # 启动应用
```
