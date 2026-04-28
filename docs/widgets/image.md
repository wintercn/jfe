# Widget: `image`

## 1. DSL 结构

```json
{
  "name": "image",
  "config": {
    "placeholder": "请输入图片 URL",
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

- 组件由图片 URL 输入框和图片预览区构成。
- 输入框显示顺序：当前值、`config.defaultValue`、空字符串。
- `config.placeholder` 仅在当前显示值为空字符串时展示。
- 图片预览区使用当前显示值作为图片地址。
- 当前显示值为空字符串时，不展示图片预览。
- 输出值为 string。

## 4. 校验规则

- 空字符串通过校验。
- 非空字符串必须是 URL。
