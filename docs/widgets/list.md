# Widget: `list`

## 1. DSL 结构

```json
{
  "name": "list",
  "config": {
    "item": {
      "name": "text-editor",
      "config": {
        "placeholder": "请输入标签",
        "defaultValue": ""
      }
    }
  }
}
```

## 2. 配置项

- `item: { name: string; config?: object }`

`item` 定义数组项使用的子 widget。

## 3. 界面定义

- 组件由一组数组项编辑区构成。
- 数组项编辑区按数组索引顺序展示。
- 每个数组项由 `config.item` 对应的子 widget 渲染。
- 数组项显示值来源顺序：当前数组中对应索引的值、子 widget 自身默认值。
- 当前值不是 array 时，按空数组展示。
- 支持在数组末尾新增一项。
- 新增项的初始值来自子 widget 自身默认值。
- 支持删除已有数组项。
- 支持调整数组项顺序。
- 输出值为 array，由所有数组项的子 widget 输出值按当前顺序组成。
- 数组项校验失败时，错误文案展示在对应数组项编辑区内。

## 4. 校验规则

- 数组项校验由 `config.item` 对应的子 widget 负责。
