# JFE Overview

JFE 是一个 JSON 可视化编辑器 DSL。它用一小组声明式 widget 描述数据如何编辑，并让编辑器根据 DSL 递归渲染界面、收集值、输出 JSON。

## 核心目标

- 用 JSON 描述编辑界面，而不是把表单逻辑写死在业务代码里。
- 每个 widget 只负责一种清晰的数据编辑语义。
- 组合 widget 可以递归嵌套，覆盖 object、array、map、table 等结构。
- 输出始终是 JSON 值，便于保存、传输和二次处理。

## DSL 形状

一个 widget 描述由 `name` 和可选的 `config` 构成。

```json
{
  "name": "text-editor",
  "config": {
    "placeholder": "Name",
    "defaultValue": ""
  }
}
```

`name` 决定使用哪个内置 widget。`config` 只保存该 widget 自己需要的配置。

## 组合模型

复杂结构通过子 widget 组合出来。

```json
{
  "name": "form",
  "config": {
    "fields": [
      {
        "key": "title",
        "widget": {
          "name": "text-editor",
          "config": {
            "defaultValue": ""
          }
        }
      },
      {
        "key": "type",
        "value": "article"
      }
    ]
  }
}
```

带 `widget` 的字段会渲染编辑控件。带 `value` 的字段不渲染控件，只在输出 JSON 中写入固定值。

## 当前实现

当前站点包含两类内容：

- Cases：可交互案例，可以直接编辑并观察输出 JSON。
- Docs：DSL 与所有内置 widget 的规范文档。

实现使用 React，不依赖第三方 UI 组件库。
