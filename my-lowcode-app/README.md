# Survey Generator - 表单/问卷生成器

一个基于 React + TypeScript + Vite 开发的低代码表单/问卷生成器，支持可视化拖拽配置，快速生成各类表单和调查问卷。

## 技术栈

- **框架**: React 19 + TypeScript
- **UI 组件库**: Ant Design 6.x
- **构建工具**: Vite
- **样式方案**: SCSS (sass-embedded)
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 项目结构

```
src/
├── assets/
│   ├── css/              # 样式文件
│   │   ├── common.scss   # 公共类
│   │   ├── index.scss    # 入口样式
│   │   ├── reset.scss    # 重置样式
│   │   └── variables.scss # SCSS 变量
│   └── react.svg
├── App.tsx               # 主应用组件
└── main.tsx              # 应用入口
```

## 开发规范

- 组件使用 PascalCase 命名（如 `SurveyEditor.tsx`）
- 样式文件使用 kebab-case 命名（如 `survey-editor.scss`）
- 类型定义优先使用 interface，必要时使用 type
- SCSS 变量统一放在 `variables.scss` 中管理

