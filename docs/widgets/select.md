# Widget: `select`

## 1. DSL 结构

```json
{
  "name": "select",
  "config": {
    "options": [
      {
        "label": "文本",
        "value": "text"
      },
      {
        "label": "图片",
        "value": "image"
      }
    ],
    "defaultValue": "text"
  }
}
```

## 2. 配置项

- `options: Array<{ label: string; value: unknown }>`
- `defaultValue?: unknown`

`options` 定义可选项集合，数组顺序为界面展示顺序。

`options[].label` 定义选项展示文本。

`options[].value` 定义选中该项时输出的值。

`defaultValue` 定义无当前值时的默认选中值。

## 3. 界面定义

- 组件由下拉选择框构成。
- 选项按 `config.options` 顺序展示。
- 当前选中项由当前值匹配 `options[].value` 得到。
- 无当前值时，使用 `config.defaultValue` 匹配选中项。
- 值匹配按 JSON 值深等判断。
- 未匹配到选中项时，选择框显示为空。
- 输出值为当前选中项的 `value`。
- 未选中任何项时，输出 `null`。

## 4. 校验规则

- 不提供独立校验配置。
- 输出值只能来自 `config.options[].value` 或 `null`。
