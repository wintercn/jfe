import type { FormField, JsonObject, JsonValue, OptionSpec, TableColumn, WidgetSpec } from './types';

export function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function asConfig(spec: WidgetSpec): Record<string, unknown> {
  return spec.config ?? {};
}

export function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

export function asBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

export function asWidget(value: unknown): WidgetSpec | undefined {
  if (!isPlainObject(value) || typeof value.name !== 'string') {
    return undefined;
  }

  return {
    name: value.name,
    config: isPlainObject(value.config) ? value.config : undefined,
  };
}

export function asOptions(value: unknown): OptionSpec[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isPlainObject(item) || typeof item.label !== 'string' || !('value' in item)) {
      return [];
    }

    return [{ label: item.label, value: normalizeJson(item.value) }];
  });
}

export function asFields(value: unknown): FormField[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const fields: FormField[] = [];

  value.forEach((item) => {
    if (!isPlainObject(item) || typeof item.key !== 'string') {
      return;
    }

    const childWidget = asWidget(item.widget);
    if (childWidget) {
      fields.push({ key: item.key, widget: childWidget });
      return;
    }

    if ('value' in item) {
      fields.push({ key: item.key, value: normalizeJson(item.value) });
    }
  });

  return fields;
}

export function asColumns(value: unknown): TableColumn[] {
  return asFields(value);
}

export function normalizeJson(value: unknown): JsonValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeJson(item));
  }

  if (isPlainObject(value)) {
    const result: JsonObject = {};
    Object.entries(value).forEach(([key, item]) => {
      result[key] = normalizeJson(item);
    });
    return result;
  }

  return null;
}

export function deepEqual(left: JsonValue | undefined, right: JsonValue | undefined): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export function getDefaultValue(spec: WidgetSpec): JsonValue {
  const config = asConfig(spec);

  switch (spec.name) {
    case 'text-editor':
    case 'url':
    case 'image':
      return asString(config.defaultValue) ?? '';

    case 'number-input':
      return asNumber(config.defaultValue) ?? null;

    case 'slider':
      return asNumber(config.defaultValue) ?? asNumber(config.min) ?? 0;

    case 'checkbox':
      return asBoolean(config.defaultValue) ?? false;

    case 'select':
    case 'radio-list':
      return 'defaultValue' in config ? normalizeJson(config.defaultValue) : null;

    case 'checkbox-list':
      return Array.isArray(config.defaultValue) ? normalizeJson(config.defaultValue) : [];

    case 'form':
      return createObjectFromFields(asFields(config.fields), {});

    case 'map':
      return {};

    case 'list':
    case 'table':
      return [];

    case 'dialog': {
      const childWidget = asWidget(config.widget);
      return childWidget ? getDefaultValue(childWidget) : null;
    }

    default:
      return null;
  }
}

export function createObjectFromFields(fields: FormField[], current: JsonObject): JsonObject {
  const result: JsonObject = {};

  fields.forEach((field) => {
    if ('widget' in field) {
      result[field.key] = Object.prototype.hasOwnProperty.call(current, field.key)
        ? current[field.key]
        : getDefaultValue(field.widget);
    } else {
      result[field.key] = field.value;
    }
  });

  return result;
}

export function createRowFromColumns(columns: TableColumn[], current: JsonObject = {}): JsonObject {
  return createObjectFromFields(columns, current);
}
