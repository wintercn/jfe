# Widget: `url`

## 1. DSL 结构

```json
{
  "name": "url",
  "config": {
    "placeholder": "请输入 URL",
    "defaultValue": ""
  }
}
```

## 2. 配置项

- `placeholder?: string`
- `defaultValue?: string`

`placeholder` 定义输入为空时的提示文本。

`defaultValue` 定义无当前值时的默认值。

## 3. 界面定义

- 组件由 URL 输入框构成。
- 输入框显示顺序：当前值、`config.defaultValue`、空字符串。
- `config.placeholder` 仅在当前显示值为空字符串时展示。
- 输出值为 string。

## 4. 校验规则

- 空字符串通过校验。
- 非空字符串必须是 URL。
