# Widget: `dialog`

## 1. DSL 结构

```json
{
  "name": "dialog",
  "config": {
    "title": "编辑详情",
    "buttonText": "编辑详情",
    "widget": {
      "name": "form",
      "config": {
        "fields": [
          {
            "key": "summary",
            "widget": {
              "name": "text-editor",
              "config": {
                "multiline": true,
                "defaultValue": ""
              }
            }
          },
          {
            "key": "enabled",
            "widget": {
              "name": "checkbox",
              "config": {
                "text": "启用",
                "defaultValue": true
              }
            }
          }
        ]
      }
    }
  }
}
```

## 2. 配置项

- `widget: { name: string; config?: object }`
- `title?: string`
- `buttonText?: string`
- `saveText?: string`
- `cancelText?: string`

`widget` 定义弹窗内使用的子 widget。

`title` 定义弹窗标题。

`buttonText` 定义折叠状态下按钮文本。

`saveText` 定义保存按钮文本。

`cancelText` 定义取消按钮文本。

## 3. 界面定义

- 组件在页面中显示为一个按钮。
- 点击按钮后打开弹窗。
- 弹窗内容由 `config.widget` 对应的子 widget 渲染。
- 打开弹窗时，子 widget 的显示值来源顺序：当前值、子 widget 自身默认值。
- 点击保存后，组件输出值更新为子 widget 当前输出值。
- 点击取消或关闭弹窗时，不更新组件输出值。
- 输出值与 `config.widget` 的输出值完全一致，不额外包裹 object。

## 4. 校验规则

- 校验由 `config.widget` 对应的子 widget 负责。
