# 架构决策记录 (Architecture Decision Records)

> 本文档记录项目中的关键技术决策，包括：适用场景、边界限制、替代方案对比

---

## 1. 配置化组件系统

### 当前方案
通过 `componentMap` + `defaultStatusMap` 实现组件与编辑器的动态绑定

```typescript
// 业务组件映射
materialComponentMap = {
  'single-select': SingleSelect,
  // ...
}

// 编辑器组件映射  
editorComponentMap = {
  'title-editor': TitleEditor,
  // ...
}
```

### ✅ 适用场景
- 组件类型相对固定（< 50 种）
- 每个组件有标准化的可配置属性
- 需要快速添加同类型组件的变体（如单选/多选/下拉选本质相同）

### ⚠️ 边界与限制
| 限制 | 说明 | 触发信号 |
|------|------|----------|
| 注册繁琐 | 新组件需在 5+ 处注册（map、slice、router、defaultStatus） | 添加一个简单组件需要修改 >3 个文件 |
| 类型膨胀 | `MaterialType` / `EditorType` 为联合类型，组件过多时类型提示变慢 | 组件类型 > 30 个 |
| 配置嵌套深 | 复杂组件的配置对象层级过深，难以维护 | 配置对象 > 4 层嵌套 |

### 🔄 替代方案

#### 方案 A：自动注册系统（推荐当组件 > 20 个时迁移）
```typescript
// 通过文件约定自动注册
// components/SurveyCom/Materials/[type]/index.tsx
// components/SurveyCom/Editor/[type]/index.tsx

const modules = import.meta.glob('./Materials/**/*.tsx');
// 自动构建 materialComponentMap
```
**权衡**：减少样板代码，但失去显式依赖追踪

#### 方案 B：插件化架构（推荐当需要第三方扩展时）
```typescript
interface Plugin {
  name: string;
  component: React.Component;
  editor: React.Component;
  defaultConfig: object;
}

// 运行时注册
pluginManager.register(externalPlugin);
```
**权衡**：支持动态加载，但增加运行时复杂度

---

## 2. 状态管理：Redux Toolkit 双 Slice 设计

### 当前方案
- `schemaSlice`: MaterialView 状态（按组件类型隔离）
- `editorSlice`: EditorView 状态（按组件列表隔离）

### ✅ 适用场景
- 两个视图数据流独立，无共享状态
- 需要 Redux DevTools 调试时间旅行
- 团队熟悉 Redux 生态

### ⚠️ 边界与限制
| 限制 | 说明 | 触发信号 |
|------|------|----------|
| 样板代码 | Action、Reducer、Selector 分离，简单更新也需多文件修改 | 80% 的 action 只是简单赋值 |
| 跨 Slice 通信 | 两个 Slice 无法直接监听对方变化 | 需要 MaterialView 和 EditorView 同步状态 |
| 学习成本 | 新成员需理解 Redux 概念 | 团队规模扩大，有人不熟悉 Redux |

### 🔄 替代方案

#### 方案 A：Zustand（推荐当需要简化时）
```typescript
const useStore = create((set) => ({
  // 一个 store 管理所有状态
  schema: {},
  editor: {},
  // 直接更新，无 action/reducer 分离
  updateTitle: (title) => set((state) => ({ ... }))
}));
```
**权衡**：代码量减少 50%，但失去 Redux DevTools 的可视化调试

#### 方案 B：Context + useReducer（推荐当状态简单时）
```typescript
// 如果 EditorView 和 MaterialView 完全独立
// 每个视图内部用 Context 足够
```
**权衡**：零依赖，但无法跨组件树共享状态

---

## 3. 组件配置结构：BaseStatus + OptionsStatus

### 当前方案
```typescript
interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps;
  // ... 10+ 个通用属性
}

interface OptionsStatus extends BaseStatus {
  options: OptionsProps;  // 选择类组件特有
}
```

### ✅ 适用场景
- 组件属性高度同质化（所有组件都有标题/描述/样式）
- 需要统一的编辑器渲染逻辑

### ⚠️ 边界与限制
| 限制 | 说明 | 触发信号 |
|------|------|----------|
| 属性冗余 | 某些组件不需要全部 BaseStatus 属性 | 出现 `isShow: false` 隐藏不用的属性 |
| 类型收窄困难 | `OptionsProps.status` 为联合类型，使用时需类型守卫 | 频繁出现 `as` 类型断言 |
| 扩展困难 | 新增通用属性需修改所有组件的 defaultStatus | 修改 BaseStatus 影响 10+ 个文件 |

### 🔄 替代方案

#### 方案 A：组合式配置（推荐当组件异构性增加时）
```typescript
interface ComponentConfig {
  id: string;
  type: string;
  props: {
    // 每个组件只声明自己需要的属性
    title?: TextConfig;
    options?: OptionsConfig;
    validation?: ValidationConfig;
  }
}
```
**权衡**：灵活度高，但失去类型安全（props 为可选）

#### 方案 B：JSON Schema 驱动（推荐当需要动态表单时）
```typescript
const schema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: '标题' },
    options: { type: 'array', items: { type: 'string' } }
  }
};
// 使用 react-jsonschema-form 自动生成编辑器
```
**权衡**：配置即表单，但自定义渲染受限

---

## 4. 拖拽方案：@dnd-kit

### 当前方案
- `@dnd-kit/core` + `@dnd-kit/sortable`
- 用于 EditorView 的组件排序

### ✅ 适用场景
- 需要可访问性支持（键盘操作、屏幕阅读器）
- 拖拽逻辑相对简单（列表排序）
- 不需要复杂的拖拽交互（如拖拽到画布创建）

### ⚠️ 边界与限制
| 限制 | 说明 | 触发信号 |
|------|------|----------|
| 学习曲线 | 概念多（Sensors、Modifiers、Context） | 简单拖拽需要理解 5+ 个概念 |
| 跨窗口拖拽 | 不支持 iframe 或跨窗口拖拽 | 需要嵌入第三方页面 |
| 性能 | 大量节点（>100）时可能卡顿 | 问卷组件 > 50 个 |

### 🔄 替代方案

#### 方案 A：react-beautiful-dnd（推荐当只需要列表排序时）
```typescript
// API 更简单，专为列表设计
<DragDropContext onDragEnd={...}>
  <Droppable droppableId="list">
    {(provided) => (
      <div ref={provided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {/* ... */}
          </Draggable>
        ))}
      </div>
    )}
  </Droppable>
</DragDropContext>
```
**权衡**：API 更简洁，但项目已进入维护模式，新功能不活跃

#### 方案 B：原生 HTML5 Drag & Drop（推荐当需求极简单时）
**权衡**：零依赖，但可访问性和移动端支持差

---

## 5. 样式方案：SCSS + Tailwind 混用

### 当前方案
- 全局样式：SCSS（`variables.scss`、`common.scss`）
- 组件样式：Tailwind CSS（通过 className）

### ✅ 适用场景
- 设计系统有明确的变量体系（颜色、间距）
- 需要快速原型开发（Tailwind 的 utility class）

### ⚠️ 边界与限制
| 限制 | 说明 | 触发信号 |
|------|------|----------|
| 心智负担 | 同时维护两套样式系统 | 不知道用 SCSS 还是 Tailwind |
| 构建体积 | Tailwind 4 + SCSS 双重编译 | 构建时间 > 5s |
| 冲突风险 | Tailwind 的 reset 可能影响 SCSS 样式 | 样式表现不一致 |

### 🔄 替代方案

#### 方案 A：纯 Tailwind（推荐当设计系统简单时）
```typescript
// 使用 tailwind.config.js 定义设计令牌
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        // ...
      }
    }
  }
}
```
**权衡**：统一体系，但复杂样式（如嵌套选择器）难以表达

#### 方案 B：CSS-in-JS（推荐当需要动态样式时）
```typescript
// styled-components 或 emotion
const StyledButton = styled.button<{ variant: string }>`
  background: ${props => props.variant === 'primary' ? 'blue' : 'gray'};
`;
```
**权衡**：样式与组件绑定，但运行时性能开销

---

## 决策迁移触发条件总结

| 当前方案 | 迁移信号 | 目标方案 |
|----------|----------|----------|
| 手动组件注册 | 组件 > 20 个 | 自动注册/文件约定 |
| Redux Toolkit | 80% action 为简单赋值 / 团队不熟悉 | Zustand |
| 继承式配置结构 | 组件异构性高 / 频繁修改 BaseStatus | 组合式配置/JSON Schema |
| @dnd-kit | 只需简单列表排序 | react-beautiful-dnd |
| SCSS + Tailwind | 维护困难 / 构建慢 | 纯 Tailwind |

---

## 当前项目阶段评估

**当前状态**：早期迭代期（组件 < 10 个，团队规模小）

**建议**：
1. ✅ 保持现有方案，暂不迁移
2. ⚠️ 关注边界信号，提前规划
3. 📝 当组件达到 15 个时，评估自动注册系统
