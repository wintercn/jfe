# Widget: `checkbox`

## 1. DSL 结构

```json
{
  "name": "checkbox",
  "config": {
    "defaultValue": false
  }
}
```

## 2. 配置项

- `defaultValue?: boolean`

`defaultValue` 定义无当前值时的默认值。

## 3. 界面定义

- 组件由复选框构成。
- 复选框选中状态来源顺序：当前值、`config.defaultValue`、`false`。
- 当前值不是 boolean 时，按无当前值处理。
- 输出值为 boolean。

## 4. 校验规则

- 不提供独立校验配置。
- 输出值只能是 boolean。
