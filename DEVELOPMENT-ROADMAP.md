# Survey Generator 开发路线图

> 本文档是项目从 MVP 到完整可展示作品的指导方案。
> 设计原则：**先做完整 → 再做有趣 → 最后做漂亮**，每阶段可独立交付和展示。

---

## 一、项目概况与当前状态

### 1.1 技术栈（保持不变）

| 层面 | 技术选型 |
|------|----------|
| 框架 | React 19 + TypeScript 6 |
| 构建 | Vite 8 |
| UI 组件库 | Ant Design 6 + @ant-design/icons |
| 状态管理 | **Redux Toolkit（保留）** |
| 样式方案 | **SCSS + Tailwind CSS（保持混用）** |
| 拖拽 | @dnd-kit (core + sortable) |
| 路由 | react-router-dom 7 |
| 后端 | Express + multer（图片上传） |

### 1.2 当前已完成的模块

- ✅ 首页问卷列表（App.tsx，AntD Table）
- ✅ 组件市场 MaterialView（6 大分类导航 + 路由）
- ✅ 6 种物料组件：SingleSelect、SinglePicSelect、MultiSelect、OptionSelect、MultiPicSelect、Input
- ✅ 编辑器三栏布局（组件面板 / 画布 / 属性编辑）
- ✅ 画布拖拽排序（@dnd-kit）
- ✅ 属性编辑器系统（9 种 Editor：Title/Desc/Option/Position/Size/Weight/Italic/Color/OptionPic）
- ✅ 配置驱动的组件注册（componentMap + defaultStatusMap）
- ✅ 图片上传后端
- ✅ 架构决策文档（ARCHITECTURE-DECISIONS.md）

### 1.3 当前待解决的问题

| 问题 | 严重程度 | 影响 |
|------|----------|------|
| 新增组件需修改 ~12 个文件 | 🔴 高 | 扩展困难，面试减分 |
| Outline 为空壳 | 🔴 高 | 低代码标配功能缺失 |
| 无问卷级配置 | 🟡 中 | 产品不完整 |
| 无预览/导出功能 | 🟡 中 | 无闭环体验 |
| 埋点系统未封装 | 🟡 中 | 有设计无落地 |
| routes 内 import 了未存在的文件 | 🟢 低 | 行 10 的 `SinglePicSelect` 其实 import 的是 `SingleSelect` |
| `actions.ts` 为残留代码 | 🟢 低 | 已被 slice reducer 替代 |

---

## 二、Phase 1：功能补齐 + 轻量重构（预计工作量最大）

> **目标**：让产品成为一个功能完整的低代码问卷生成器，任何人打开都能从 0 到 1 完成一份问卷。

### 2.1 收敛组件注册入口 ✨核心重构✨

**当前痛点**：新增一个组件需要修改 5+ 处（defaultStatus、defaultStatusMap、componentMap、routes、SurveyEditorConfig、类型定义、schemaSlice 初始化）。

**目标**：新增一个组件只需 **2 步** — ① 创建组件文件 ② 在一个注册表中声明。

**方案设计**：

```
src/
├── registry/                    # 新增：统一注册中心
│   ├── index.ts                 # 导出所有注册表
│   ├── materialRegistry.ts      # 物料组件注册表
│   └── editorRegistry.ts        # 编辑器组件注册表（不变）
```

`materialRegistry.ts` 的数据结构：

```typescript
// 一份注册表，替代原来的 4 个分散文件
interface MaterialRegistryEntry {
  type: string;                    // 如 'single-select'
  name: string;                    // 显示名：'单选题'
  category: 'select' | 'input' | 'advanced' | 'note' | 'personalinfo' | 'contact';
  icon?: React.ReactNode;          // 分类图标（可选）
  component: React.ComponentType;  // 物料组件
  createDefaultStatus: () => ComponentStatus;  // 默认状态工厂
}

const materialRegistry: MaterialRegistryEntry[] = [
  {
    type: 'single-select',
    name: '单选题',
    category: 'select',
    component: SingleSelect,
    createDefaultStatus: createSingleSelectStatus,
  },
  // ...其他组件
];
```

**收益**：
- 删掉 `defaultStatusMap.ts`（被 registry 吸收）
- `componentMap.ts` 中的 `materialComponentMap` 可自动生成
- `SurveyEditorConfig.tsx` 可自动生成
- routes 中的 loader 逻辑简化为遍历 registry
- schemaSlice 的 `initialState.com` 可自动生成

**改动文件清单**：
| 操作 | 文件 |
|------|------|
| 新建 | `src/registry/materialRegistry.ts` |
| 新建 | `src/registry/index.ts` |
| 修改 | `src/config/dufaultStatues/componentMap.ts` — 从 registry 导出 |
| 修改 | `src/config/SurveyEditorConfig.tsx` — 从 registry 动态生成 |
| 修改 | `src/redux/schemaSlice.ts` — 从 registry 动态初始化 |
| 修改 | `src/routers/index.tsx` — 从 registry 动态生成路由 |
| 可选删除 | `src/config/dufaultStatues/defaultStatusMap.ts` — 功能被 registry 覆盖 |

### 2.2 大纲树（Outline）

**目标**：在左侧面板的「大纲」Tab 中展示画布上的组件树形结构，支持点击定位和拖拽排序。

**功能要点**：
- 展示画布上所有组件的类型图标 + 名称
- 点击大纲节点 → 画布和属性面板同步高亮
- 支持在大纲中拖拽排序（与画布拖拽联动）
- 当前选中的组件在大纲中高亮
- 悬停时有「删除」按钮

**技术方案**：
- 复用 `editorSlice.comStatus` 作为数据源，无需新状态
- 使用 Ant Design 的 `Tree` 组件（或自定义列表）
- 拖拽复用 `@dnd-kit`（与 CenterView 共享同一个 `DndContext` 需考虑方案）

**改动文件**：
| 操作 | 文件 |
|------|------|
| 重构 | `src/views/EditorView/EditorLeftView/Outline.tsx` |

### 2.3 画布：从组件市场拖入组件

**当前状态**：用户只能通过点击「题型」Tab 中的按钮来添加组件。

**目标**：支持从左侧组件面板拖拽组件到画布中创建。

**技术方案**：
- 利用 `@dnd-kit` 的跨容器拖拽能力
- 左侧 SurveyComType 中的组件按钮作为 `Draggable`
- 画布作为 `Droppable`
- 拖入时调用 `addComponentStatus`

**改动文件**：
| 操作 | 文件 |
|------|------|
| 修改 | `src/views/EditorView/CenterView.tsx` — 添加 droppable 逻辑 |
| 修改 | `src/components/Editor/SurveyGroupItems.tsx` — 添加 draggable 逻辑 |
| 修改 | `src/views/EditorView/index.tsx` — 提升 DndContext 到 EditorView 层级 |

### 2.4 问卷级配置

**目标**：用户可以为整份问卷设置标题、描述、开始/结束语等元信息。

**Redux 扩展**：在 `editorSlice` 中新增 `surveyMeta` 字段：

```typescript
// editorSlice 初始状态扩展
{
  surveyMeta: {
    title: '未命名问卷',
    description: '',
    startTime: null,
    endTime: null,
    theme: 'default',
  }
}
```

**UI 设计**：
- 画布顶部显示问卷标题（可点击编辑）
- 右侧属性面板在未选中任何组件时，显示问卷级配置
- 或者在画布顶部有一个固定的「问卷设置」区域

**改动文件**：
| 操作 | 文件 |
|------|------|
| 修改 | `src/redux/editorSlice.ts` — 新增 surveyMeta 状态和 actions |
| 修改 | `src/views/EditorView/CenterView.tsx` — 画布顶部渲染问卷标题区 |
| 修改 | `src/views/EditorView/RightView.tsx` — 无选中组件时显示问卷配置 |
| 新建 | `src/components/SurveyCom/Editor/SurveyMetaEditor.tsx` — 问卷元信息编辑器 |

### 2.5 预览模式

**目标**：用户点击「预览」按钮后，看到最终问卷的展示效果（模拟填写端）。

**方案**：新增路由 `/preview`，渲染一个只读的问卷视图。

```
/preview → PreviewView
  - 使用 editorSlice.comStatus 数据
  - 顺序渲染所有组件（不含拖拽、删除、编辑功能）
  - 顶部显示问卷标题 + 描述
  - 底部有「提交」按钮（Mock）
  - 左上角有「返回编辑」按钮
```

**改动文件**：
| 操作 | 文件 |
|------|------|
| 新建 | `src/views/PreviewView/index.tsx` |
| 修改 | `src/routers/index.tsx` — 新增 /preview 路由 |
| 修改 | `src/components/Common/Header.tsx` — 添加「预览」按钮 |

### 2.6 埋点系统正式封装

**当前状态**：散落的 `console.log('[埋点]...')` 和一份设计文档。

**目标**：封装为独立的 `trace` 工具模块，支持模块分类、级别过滤、生产环境零开销。

**实现**：按 [设计一个埋点系统.md](file:///d:/survey/survey-generator/summery/基础练习/设计一个埋点系统.md) 的设计来实现。

**改动文件**：
| 操作 | 文件 |
|------|------|
| 新建 | `src/utils/trace.ts` — 埋点核心模块 |
| 修改 | 各组件散落的 `console.log('[埋点]...')` → `trace(...)` |

### 2.7 修复已知 Bug & 清理残留

- 🔧 [routers/index.tsx L10](file:///d:/survey/survey-generator/my-lowcode-app/src/routers/index.tsx#L10)：`import SinglePicSelect from "@/components/SurveyCom/Materials/SelectComs/SingleSelect"` 文件名是 `SingleSelect`，但变量名和预期路径是 `SinglePicSelect`
- 🧹 删除 `src/redux/actions.ts`（已被 slice reducer 替代的残留代码）
- 🔧 `schemaSlice` 中 `setPicOptions` 和 `setOptions` 逻辑完全一样，合并或添加注释说明

---

## 三、Phase 2：AI 能力集成

> **目标**：用户可以用自然语言生成问卷，这是面试中的差异化亮点。

### 3.1 AI 生成问卷

**核心交互流程**：

```
用户输入自然语言描述
    ↓
前端调用 AI API（流式响应）
    ↓
AI 返回结构化的问卷 JSON
    ↓
前端解析 JSON → 调用 addComponentStatus 批量添加到画布
    ↓
用户可以在画布上继续手动编辑微调
```

**场景示例**：
- 用户输入：*「帮我生成一份关于咖啡消费习惯的调查，包含5道题，要涵盖频率、品牌偏好、价格敏感度」*
- AI 输出：结构化的问卷数据（题目类型 + 标题 + 选项 + 描述）

### 3.2 技术方案设计

**API 层**：在后端 server 中新增 `/api/ai/generate-survey` 端点。

```javascript
// server.js 新增
app.post('/api/ai/generate-survey', async (req, res) => {
  const { prompt } = req.body;
  // 1. 构造 System Prompt（告诉 AI 输出格式）
  // 2. 调用大模型 API（OpenAI 兼容接口）
  // 3. 返回结构化 JSON
});
```

**前端交互**：在 EditorView 的画布区域顶部添加 AI 入口。

```
┌──────────────────────────────────────┐
│  🤖 AI 生成问卷                       │
│  ┌──────────────────────────────────┐│
│  │ 描述你想要什么问卷...              ││
│  └──────────────────────────────────┘│
│  [生成]  [示例: 员工满意度调查]       │
└──────────────────────────────────────┘
```

**AI 返回的数据格式**（与现有 `ComponentStatus` 对齐）：

```typescript
interface AIGeneratedSurvey {
  surveyTitle: string;
  surveyDescription: string;
  components: Array<{
    type: 'single-select' | 'multi-select' | 'input';
    title: string;
    description?: string;
    options?: string[];
    placeholder?: string;
  }>;
}
```

**改动文件清单**：
| 操作 | 文件 |
|------|------|
| 新建 | `src/components/AI/AIGeneratePanel.tsx` — AI 生成面板 UI |
| 新建 | `src/utils/aiSurveyParser.ts` — 将 AI 返回数据转换为 dispatch actions |
| 修改 | `src/views/EditorView/index.tsx` 或 `CenterView.tsx` — 嵌入 AI 面板 |
| 修改 | `server/server.js` — 新增 `/api/ai/generate-survey` 端点 |
| 新建 | `server/prompts/survey-generation.txt` — System Prompt 模板 |

### 3.3 AI 的工程化考虑

1. **API Key 安全**：API Key 存在后端环境变量，前端不暴露
2. **流式响应**：使用 SSE（Server-Sent Events）实现逐字输出动画
3. **错误处理**：AI 返回格式不正确时的 fallback 和用户提示
4. **成本控制**：前端展示 token 用量估算

---

## 四、Phase 3：深度重构 + 工程化打磨

> **目标**：代码质量达到可以接受面试官 Code Review 的水平。

### 4.1 类型系统重构

**当前问题**：
- `editPropsType.ts` 中的 `BaseStatus` / `OptionsStatus` / `InputStatus` 是继承式设计，但某些组件不需要所有 BaseStatus 属性
- 存在大量 `as any` 类型断言
- `editorSlice.ts` L30 的 `payload.type as keyof typeof currentComponent.status` 不够类型安全

**方案**：

```typescript
// 工具类型：只保留 isShow 为 true 的可编辑属性
type EditableKeys<T> = {
  [K in keyof T]: T[K] extends { isShow: boolean } ? K : never
}[keyof T];

// 或者：引入 discriminated union
type ComponentStatus =
  | { type: 'single-select'; status: OptionsStatus }
  | { type: 'input'; status: InputStatus }
  // ...
```

**改动文件**：
| 操作 | 文件 |
|------|------|
| 修改 | `src/types/editPropsType.ts` |
| 修改 | `src/types/schemaDiscript.ts` |
| 修改 | `src/redux/editorSlice.ts` — 消除 `as any` |
| 修改 | `src/components/SurveyCom/Editor/EditorPanel.tsx` |

### 4.2 Redux 优化

**保留 Redux Toolkit 的前提下做这些优化**：

1. **选择器优化**：组件只订阅需要的状态片段，避免不必要的重渲染
   ```typescript
   // ❌ 当前：RightView 订阅了整个 comStatus 数组
   const comStatus = useAppSelector(state => state.editor.comStatus);
   const currentComponent = comStatus[currentIndex];
   
   // ✅ 优化：使用 memoized selector 只获取当前组件
   const currentComponent = useAppSelector(state => 
     state.editor.comStatus[state.editor.currentIndex]
   );
   ```

2. **消除冗余 action**：`schemaSlice` 中的 `setPicOptions` 和 `setOptions` 逻辑重复，合并或添加合理的区分

3. **使用 `createEntityAdapter`**（可选）：如果 comStatus 数组操作频繁，可以考虑使用 Redux 的 Entity Adapter

### 4.3 组件规范化

1. **命名一致性**：修复文件 `SigleSelect`（少了个 n）→ `SingleSelect`
2. **目录结构**：`dufaultStatues` → `defaultStatuses`（拼写错误修正）
3. **组件拆分**：`CenterView.tsx` 当前 ~100 行，拖拽逻辑和内联样式较多，可抽离
4. **移除 magic number/string**：将颜色值、间距等提取为常量

### 4.4 测试覆盖

为关键模块添加单元测试：

| 测试对象 | 测试内容 |
|----------|----------|
| `materialRegistry` | 注册表数据完整性、无重复 type |
| `editorSlice` | add/remove/reorder/update 的 reducer 逻辑 |
| `trace.ts` | 埋点模块的各种级别和过滤逻辑 |
| `aiSurveyParser.ts` | AI 返回数据的解析和转换 |

### 4.5 性能优化

1. **组件懒加载**：MaterialView 的子路由组件使用 `React.lazy`
2. **编辑器懒加载**：RightView 的编辑器组件按需加载
3. **虚拟列表**：如果问卷题目 > 50 个，画布使用虚拟滚动

---

## 五、面试展示策略

### 5.1 README 重构建议

把 [README.md](file:///d:/survey/survey-generator/my-lowcode-app/README.md) 扩展为面试展示级别的文档，至少包含：

```markdown
# Survey Generator

## 一句话介绍
基于 React 19 + TypeScript 的低代码问卷生成器，支持可视化配置 + AI 辅助生成。

## 核心功能
- 🔧 可视化编辑器：拖拽排序、实时预览、属性配置
- 🤖 AI 辅助：自然语言生成问卷
- 📦 组件市场：6 大类题型，可扩展架构
- 📊 数据闭环：发布 → 收集 → 分析（计划中）

## 技术亮点
- Redux Toolkit 双 Slice 状态隔离设计
- 配置驱动的动态组件渲染
- 统一组件注册中心（插件化架构）
- 分级埋点系统（模块化 + 生产环境零开销）

## 架构决策
详见 [ARCHITECTURE-DECISIONS.md](./ARCHITECTURE-DECISIONS.md)
（包含每种技术方案的适用场景、边界条件、替代方案对比）
```

### 5.2 面试话术建议

1. **为什么做这个项目**：对低代码平台架构感兴趣，想亲手实现一个
2. **技术选型为什么这样**：React 19（最新生态）+ Redux Toolkit（状态管理成熟方案）+ @dnd-kit（可访问性优先），详见架构决策文档
3. **遇到的最大挑战**：组件注册体系的设计演进（从手动注册到统一注册中心），数据流从路由驱动到 Redux 驱动的取舍
4. **AI 集成的思考**：如何设计 AI 输出的 Schema 与已有组件系统对齐，流式响应的用户体验，API Key 安全

### 5.3 本地演示准备

- 确保 `pnpm dev` 能一键启动
- 准备 2-3 个 Demo 问卷（保存在本地数据中）
- AI 功能需要预先配置好环境变量（给面试官提供 `.env.example`）

---

## 六、执行优先级矩阵

```
                    影响力
              高              低
        ┌──────────────┬──────────────┐
    高  │ 2.1 注册收敛  │ 2.6 埋点封装  │
        │ 2.5 预览模式  │ 4.1 类型重构  │
紧迫    │ 2.2 大纲树    │ 4.4 测试      │
性   ──┼──────────────┼──────────────┤
        │ 2.4 问卷配置  │ 3.1 AI 生成   │
    低  │ 2.7 Bug 修复  │ 4.5 性能优化  │
        │ 2.3 拖入画布  │ 4.3 命名修正  │
        └──────────────┴──────────────┘
```

**建议执行顺序**（每项的序号即建议顺序）：

| 序号 | 任务 | 归属 Phase |
|------|------|------------|
| 1 | 2.1 收敛组件注册入口 | Phase 1 |
| 2 | 2.7 修复 Bug & 清理残留 | Phase 1 |
| 3 | 2.2 大纲树 Outline | Phase 1 |
| 4 | 2.4 问卷级配置 | Phase 1 |
| 5 | 2.5 预览模式 | Phase 1 |
| 6 | 2.3 拖入画布 | Phase 1 |
| 7 | 2.6 埋点系统封装 | Phase 1 |
| 8 | 3.1 AI 生成问卷 | Phase 2 |
| 9 | 4.1 类型系统重构 | Phase 3 |
| 10 | 4.3 组件规范化 | Phase 3 |
| 11 | 4.2 Redux 优化 | Phase 3 |
| 12 | 4.4 测试覆盖 | Phase 3 |
| 13 | 4.5 性能优化 | Phase 3 |

---

## 七、风险与对策

| 风险 | 对策 |
|------|------|
| 注册收敛改动面大，可能引入 bug | 分步迁移，先建 registry，再逐个替换引用，保持新旧并行直到验证通过 |
| AI 接口调用成本 | 本地 mock 模式开发，上线前接真实 API；加入 token 计数展示 |
| 重构过程中影响已有功能 | 每完成一个任务就检查 `pnpm dev` 是否正常、核心流程是否可走通 |
| 时间不够 | Phase 1 是底线，Phase 2 是加分项，Phase 3 可以逐步做 |
