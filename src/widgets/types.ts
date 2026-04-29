export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type WidgetSpec = {
  name: string;
  config?: Record<string, unknown>;
};

export type EditorProps = {
  spec: WidgetSpec;
  value: JsonValue | undefined;
  onChange: (value: JsonValue) => void;
};

export type OptionSpec = {
  label: string;
  value: JsonValue;
};

export type FormField =
  | {
      key: string;
      widget: WidgetSpec;
    }
  | {
      key: string;
      value: JsonValue;
    };

export type TableColumn = FormField;
