# Widget: `number-input`

## 1. DSL 结构

```json
{
  "name": "number-input",
  "config": {
    "min": 0,
    "max": 100,
    "step": 1,
    "defaultValue": 0
  }
}
```

## 2. 配置项

- `min?: number`
- `max?: number`
- `step?: number`
- `defaultValue?: number`

`min` 定义允许输入的最小值。

`max` 定义允许输入的最大值。

`step` 定义输入步进值。

`defaultValue` 定义无当前值时的默认值。

## 3. 界面定义

- 组件由数字输入框构成。
- 输入框显示顺序：当前值、`config.defaultValue`、空值。
- 当前值不是 number 时，按无当前值处理。
- 输出值为 number 或 `null`。
- 输入框为空时，输出 `null`。

## 4. 校验规则

- `min` 存在时，输出 number 必须大于等于 `config.min`。
- `max` 存在时，输出 number 必须小于等于 `config.max`。
- 输出 `null` 时，不执行 `min/max` 校验。
