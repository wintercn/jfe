# Widget: `map`

## 1. DSL 结构

```json
{
  "name": "map",
  "config": {
    "valueWidget": {
      "name": "text-editor",
      "config": {
        "placeholder": "请输入值",
        "defaultValue": ""
      }
    }
  }
}
```

## 2. 配置项

- `valueWidget: { name: string; config?: object }`

`valueWidget` 定义每个键对应的值使用的子 widget。

## 3. 界面定义

- 组件由一组键值编辑区构成。
- 每个键值编辑区包含一个键输入区和一个值输入区。
- 键输入区用于编辑 object 的直接属性名，不表示路径。
- 值输入区由 `config.valueWidget` 对应的子 widget 渲染。
- 当前值不是普通 object 时，按空 object 展示。
- 支持新增键值项。
- 新增键值项的键为空字符串。
- 新增键值项的值来自子 widget 自身默认值。
- 支持删除已有键值项。
- 支持修改已有键名。
- 输出值为 object，由所有键值项组成。
- 键为空字符串的键值项不进入输出 object。
- 多个键值项使用相同键时，后出现的键值项覆盖先出现的键值项。
- 值校验失败时，错误文案展示在对应键值编辑区内。

## 4. 校验规则

- 值校验由 `config.valueWidget` 对应的子 widget 负责。
- 键不提供独立校验配置。
