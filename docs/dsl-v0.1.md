# JFE DSL v0.1（草案）

## 1. 目标

该 DSL 用于描述 JSON 可视化编辑器。

设计原则：
- 类型由 `editor.widget` 决定。
- `type` 为可选的 TypeScript 类型声明，仅用于提示/导出，不参与渲染。
- 同一数据类型可有多种内置编辑器（通过不同 `widget` 表达）。

---

## 2. 数据结构

### 2.1 顶层结构

```json
{
  "$dsl": "jfe/v0.1",
  "root": {
    "editor": { "widget": "object", "layout": "form" },
    "fields": []
  }
}
```

约束：
- `root.editor.widget` 必须为 `object`。
- `root` 没有 `key`。

### 2.2 节点结构

```json
{
  "key": "name",
  "editor": { "widget": "text", "label": "名称" },
  "type": "string"
}
```

字段说明：
- `key`: 字段名。是否需要由父编辑器上下文决定，不是通用必填字段。
- `editor`: 编辑器配置（必填）。
- `type`: 可选 TS 类型声明字符串。
- `fields`: 仅 `object` 使用。
- `element`: 仅 `array` 使用。

上下文约束：
- 当父节点是 `object` 时，`fields` 的每一项必须有 `key`。
- 当父节点是 `array` 时，`element` 不需要 `key`。
- 当父节点是 `kv-object` 时，schema 节点不声明具体 key（key 为运行时输入）。

---

## 3. 当前基础格式（已确认）

```json
{
  "$dsl": "jfe/v0.1",
  "root": {
    "editor": { "widget": "object", "layout": "form" },
    "fields": [
      {
        "key": "name",
        "editor": { "widget": "text", "label": "名称" },
        "type": "string"
      },
      {
        "key": "enabled",
        "editor": { "widget": "checkbox", "label": "启用" },
        "type": "boolean"
      },
      {
        "key": "tags",
        "editor": { "widget": "array", "label": "标签" },
        "element": {
          "editor": { "widget": "text", "label": "标签项" },
          "type": "string"
        },
        "type": "string[]"
      }
    ]
  }
}
```

---

## 4. 内置编辑器设计

核心要求：同一类型可对应多个编辑器。

### 4.1 string
- `text`: 单行输入。
- `textarea`: 多行文本。
- `select`: 下拉单选（静态选项）。

### 4.2 number
- `number`: 数字输入。
- `slider`: 滑块输入。

### 4.3 boolean
- `checkbox`: 复选框。
- `switch`: 开关。

### 4.4 array
- `array`: 默认列表编辑（增删、排序可后续扩展）。
- `array-table`: 表格编辑（元素为 object 时常用）。

### 4.5 object
固定字段对象使用 `object` 编辑器：
- 场景：结构已知、表单化编辑。
- 表达：`fields` 明确列出子字段。

键值对对象使用独立编辑器 `kv-object`：
- 场景：动态配置、键不固定。
- 表达：`editor.widget = "kv-object"`，并定义 `valueEditor` 描述 value 的编辑方式。

示例：

```json
{
  "key": "settings",
  "editor": { "widget": "kv-object", "label": "设置" },
  "valueEditor": {
    "editor": { "widget": "text" },
    "type": "string"
  },
  "type": "Record<string, string>"
}
```

`object` 固定字段示例：

```json
{
  "key": "profile",
  "editor": { "widget": "object", "label": "资料" },
  "fields": [
    { "key": "name", "editor": { "widget": "text", "label": "姓名" }, "type": "string" },
    { "key": "age", "editor": { "widget": "number", "label": "年龄" }, "type": "number" }
  ],
  "type": "{ name: string; age: number }"
}
```

---

## 5. 结构约束（v0.1）

- `editor.widget = object` 时必须有 `fields`。
- `editor.widget = kv-object` 时必须有 `valueEditor`。
- `editor.widget = array` 时必须有 `element`。
- 非 `object/array/kv-object` 节点不能声明 `fields/element/valueEditor`。
- `key` 不是节点通用必填项；仅在 `object` 的 `fields` 子项中必填。

---

## 6. Widget 文档

内置编辑器规范已独立到：`docs/builtin-widgets-v0.1.md`。

---

## 7. 下一步建议

v0.2 可补充：
- 各 `widget` 的通用 UI 属性（`label`, `description`, `placeholder`, `disabled` 等）。
- `select` 的 `options` 结构。
- `array` 的操作能力（是否允许新增/删除/排序）。
- `kv-object` 下 key 的约束（是否允许空、重复、正则限制）。
