# Widget: `table`

## 1. DSL 结构

```json
{
  "name": "table",
  "config": {
    "columns": [
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
        "value": "item"
      }
    ]
  }
}
```

## 2. 配置项

- `columns: Array<{ key: string; widget: { name: string; config?: object } } | { key: string; value: unknown }>`

`columns` 定义每一行 object 的固定字段集合，数组顺序为表格列展示顺序。

`columns[].key` 表示行 object 的直接属性名，不表示路径。

`columns[].widget` 定义该列使用的子 widget。

`columns[].value` 定义该列输出的固定值。

## 3. 界面定义

- 组件由表格行和表格列构成。
- 表格列按 `config.columns` 顺序展示。
- 当前值不是 array 时，按空数组展示。
- 当前数组项不是普通 object 时，该行按空 object 展示。
- 带 `widget` 的列由对应子 widget 渲染单元格输入区域。
- 带 `value` 的列不渲染输入区域。
- 带 `widget` 的单元格显示值来源顺序：当前行 object 中对应 `key` 的值、子 widget 自身默认值。
- 支持在表格末尾新增一行。
- 新增行由所有列共同产生 object：带 `widget` 的列使用子 widget 自身默认值，带 `value` 的列使用固定值。
- 支持删除已有行。
- 支持调整行顺序。
- 输出值为 array，每一项为一行 object。
- 每行 object 由所有带 `widget` 列的子 widget 输出值和所有带 `value` 列的固定值组成。
- 单元格校验失败时，错误文案展示在对应单元格内。

## 4. 校验规则

- 带 `widget` 列的校验由对应子 widget 负责。
- 带 `value` 列不执行校验。
