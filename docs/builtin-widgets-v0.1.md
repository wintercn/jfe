# JFE Built-in Widgets v0.1

内置 widget 按输出数据类型分组。除 `select` 和 `radio-list` 外，每个 widget 都有明确的主要输出类型。

widget DSL 的顶层字段为 `name`，widget 专属参数放在 `config` 内。

`dialog` 是透明包装 widget。它不改变子 widget 的输出类型，只改变编辑入口。

## string

- [text-editor](/Users/chengshaofei/code/jfather/docs/widgets/text-editor.md)
- [url](/Users/chengshaofei/code/jfather/docs/widgets/url.md)
- [image](/Users/chengshaofei/code/jfather/docs/widgets/image.md)

string 组用于编辑字符串。`text-editor` 支持单行和多行模式，`url` 和 `image` 都输出 URL 字符串。

## number

- [number-input](/Users/chengshaofei/code/jfather/docs/widgets/number-input.md)
- [slider](/Users/chengshaofei/code/jfather/docs/widgets/slider.md)

number 组用于编辑数字。`number-input` 适合精确输入，`slider` 适合范围内调节。

## boolean

- [checkbox](/Users/chengshaofei/code/jfather/docs/widgets/checkbox.md)

boolean 组只保留 `checkbox`。它可以配置右侧展示文本，但输出仍然是 boolean。

## object

- [map](/Users/chengshaofei/code/jfather/docs/widgets/map.md)
- [form](/Users/chengshaofei/code/jfather/docs/widgets/form.md)

object 组分为动态键值和固定字段。`map` 由用户产生 key，`form` 由 DSL 固定 key。

## array

- [list](/Users/chengshaofei/code/jfather/docs/widgets/list.md)
- [table](/Users/chengshaofei/code/jfather/docs/widgets/table.md)
- [checkbox-list](/Users/chengshaofei/code/jfather/docs/widgets/checkbox-list.md)

array 组分为普通列表、表格型 object 数组和复选列表。

## any

- [select](/Users/chengshaofei/code/jfather/docs/widgets/select.md)
- [radio-list](/Users/chengshaofei/code/jfather/docs/widgets/radio-list.md)
- [dialog](/Users/chengshaofei/code/jfather/docs/widgets/dialog.md)

`select` 和 `radio-list` 的选项值可以是任意 JSON 值，因此归入 any。

`dialog` 的输出值来自它包装的子 widget，因此也可以输出任意 JSON 值。
