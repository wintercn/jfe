# Widget: `slider`

## 1. DSL 结构

```json
{
  "name": "slider",
  "config": {
    "min": 0,
    "max": 100,
    "step": 1,
    "defaultValue": 50
  }
}
```

## 2. 配置项

- `min: number`
- `max: number`
- `step?: number`
- `defaultValue?: number`

`min` 定义滑块最小值。

`max` 定义滑块最大值。

`step` 定义滑块步进值。

`defaultValue` 定义无当前值时的默认值。

## 3. 界面定义

- 组件由滑块构成。
- 滑块显示顺序：当前值、`config.defaultValue`、`config.min`。
- 当前值不是 number 时，按无当前值处理。
- 输出值为 number。

## 4. 校验规则

- 输出值必须大于等于 `config.min`。
- 输出值必须小于等于 `config.max`。
