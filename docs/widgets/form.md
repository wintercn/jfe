# Widget: `form`

## 1. DSL 结构

```json
{
  "name": "form",
  "config": {
    "fields": [
      {
        "key": "name",
        "widget": {
          "name": "text-editor",
          "config": {
            "placeholder": "请输入名称",
            "defaultValue": ""
          }
        }
      },
      {
        "key": "description",
        "widget": {
          "name": "text-editor",
          "config": {
            "placeholder": "请输入描述",
            "defaultValue": ""
          }
        }
      },
      {
        "key": "type",
        "value": "profile"
      }
    ]
  }
}
```

## 2. 配置项

- `fields: Array<{ key: string; widget: { name: string; config?: object } } | { key: string; value: unknown }>`

`fields` 定义固定字段集合，数组顺序为界面展示顺序。

`fields[].key` 表示 object 的直接属性名，不表示路径。

`fields[].widget` 定义该字段使用的子 widget。

`fields[].value` 定义该字段输出的固定值。

## 3. 界面定义

- 组件由一组字段编辑区构成。
- 字段编辑区按 `config.fields` 顺序展示。
- 每个字段使用 `fields[].key` 作为字段名。
- 带 `widget` 的字段由对应子 widget 渲染输入区域。
- 带 `value` 的字段不渲染输入区域。
- 带 `widget` 的字段显示值来源顺序：当前 object 中对应 `key` 的值、子 widget 自身默认值。
- 当前值不是普通 object 时，按空 object 展示。
- 输出值为 object，由所有带 `widget` 字段的子 widget 输出值和所有带 `value` 字段的固定值组成。
- 字段校验失败时，错误文案展示在对应字段编辑区内。

## 4. 校验规则

- 带 `widget` 字段的校验由对应子 widget 负责。
- 带 `value` 字段不执行校验。
