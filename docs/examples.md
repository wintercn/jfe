# Examples

本页说明当前站点里的几个核心案例，以及它们验证的 DSL 能力。

## form

`form` 用于固定字段 object。字段可以来自子 widget，也可以来自固定值。

适合资料卡、配置对象、嵌套结构中的固定 schema。

## nested form

`form` 可以嵌套 `form`。每一层都输出 object，父级字段接收子 form 的输出值。

这个案例验证：

- object 中继续嵌套 object。
- 固定值字段参与输出但不渲染输入控件。
- checkbox 输出 boolean。

## list of forms

`list` 的 `item` 可以是 `form`。每个列表项输出一个 object，整个 list 输出 object 数组。

这个案例验证：

- array 中每项都是结构化 object。
- 多行 `text-editor` 可以作为块级字段展示。
- 新增、删除、排序不改变每项内部结构。

## table

`table` 用列定义每一行 object。带 `widget` 的列显示为可编辑单元格，带 `value` 的列只参与输出，不显示在表格中。

这个案例适合编辑同构 object 数组。

## choices

`select`、`radio-list`、`checkbox-list` 共享选项模型。

```json
{
  "label": "Object",
  "value": {
    "type": "object"
  }
}
```

选项的 `value` 可以是任意 JSON 值。
