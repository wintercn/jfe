# Widget: `text-editor`

## 1. 目标

用于编辑单行字符串值，适合短文本（名称、标题、标识符、短描述）。

## 2. 适用类型

- 基本类型：`string`

## 3. DSL 结构

```json
{
  "name": "text-editor",
  "config": {
    "placeholder": "请输入名称",
    "defaultValue": "",
    "trim": true,
    "validation": {
      "minLength": 2,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_\\-\\s]+$",
      "patternFlags": "u",
      "validator": "validateName",
      "messages": {
        "minLength": "至少 2 个字符",
        "maxLength": "最多 20 个字符",
        "pattern": "格式不合法",
        "validator": "名称校验失败"
      }
    }
  }
}
```

## 4. 配置项

- `placeholder?: string`
- `defaultValue?: string`
- `trim?: boolean`
- `validation?: { minLength?: number; maxLength?: number; pattern?: string; patternFlags?: string; validator?: string; messages?: { minLength?: string; maxLength?: string; pattern?: string; validator?: string } }`

## 5. 交互定义

- 输入方式：单行输入。
- 当 `config.trim=true` 时，对最终值执行首尾空白裁剪。

## 6. 数据契约

- 用户输入类型：`string`
- 输出数据类型：`string`

## 7. 校验规则

- 校验入口：`config.validation`。
- 支持规则：`minLength`、`maxLength`、`pattern`、`validator`。
- `pattern` 使用正则字符串，`patternFlags` 可选（如 `i`、`u`）。
- `minLength/maxLength` 作用于最终待提交字符串（`config.trim=true` 时先 trim 再校验）。
- `validator` 为外部注册的校验器名，返回 `true` 或错误码字符串。
- `messages` 用于覆盖各规则默认错误文案。
- 执行顺序：`minLength/maxLength -> pattern -> validator`。
- 不处理多行文本，换行符在输入时移除。

## 8. 界面定义

- 组件由输入框区域构成。
- 输入框为单行文本框，显示顺序：当前值优先，其次 `config.defaultValue`，最后空字符串。
- `config.placeholder` 仅在当前显示值为空字符串时展示。
- 校验失败时，在输入框下方展示单行错误文案（来自 `config.validation.messages` 或系统默认文案）。

## 9. 可访问性

- 使用原生 `input[type=text]`。
