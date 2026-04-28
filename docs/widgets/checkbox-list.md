# Widget: `checkbox-list`

## 1. DSL 结构

```json
{
  "name": "checkbox-list",
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
    "defaultValue": [
      "text"
    ]
  }
}
```

## 2. 配置项

- `options: Array<{ label: string; value: unknown }>`
- `defaultValue?: unknown[]`

`options` 定义可选项集合，数组顺序为界面展示顺序。

`options[].label` 定义选项展示文本。

`options[].value` 定义选中该项时输出的值。

`defaultValue` 定义无当前值时的默认选中值数组。

## 3. 界面定义

- 组件由一组选项构成。
- 选项按 `config.options` 顺序展示。
- 可以同时选中多个选项。
- 当前值不是 array 时，使用 `config.defaultValue` 匹配选中项。
- 无当前值且无 `config.defaultValue` 时，所有选项均未选中。
- 值匹配按 JSON 值深等判断。
- 输出值为 array，由所有选中项的 `value` 按 `config.options` 顺序组成。

## 4. 校验规则

- 不提供独立校验配置。
- 输出数组中的值只能来自 `config.options[].value`。
