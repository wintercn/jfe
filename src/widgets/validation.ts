import { asConfig, asNumber, asOptions, asString, asWidget, deepEqual, isPlainObject } from './json';
import type { JsonValue, WidgetSpec } from './types';

export function validateValue(spec: WidgetSpec, value: JsonValue | undefined): string | undefined {
  const config = asConfig(spec);

  switch (spec.name) {
    case 'text-editor':
      return validateText(config, value);
    case 'url':
    case 'image':
      return validateUrl(value);
    case 'number-input':
      return validateNumber(config, value, true);
    case 'slider':
      return validateNumber(config, value, false);
    case 'select':
    case 'radio-list':
      return validateSingleOption(config, value);
    case 'checkbox-list':
      return validateMultiOption(config, value);
    case 'checkbox':
      return typeof value === 'boolean' ? undefined : 'Expected boolean.';
    case 'dialog': {
      const childWidget = asWidget(config.widget);
      return childWidget ? validateValue(childWidget, value) : undefined;
    }
    default:
      return undefined;
  }
}

function validateText(config: Record<string, unknown>, value: JsonValue | undefined): string | undefined {
  const text = typeof value === 'string' ? value : '';
  const source = config.trim === true ? text.trim() : text;
  const validation = isPlainObject(config.validation) ? config.validation : {};
  const messages = isPlainObject(validation.messages) ? validation.messages : {};

  const minLength = asNumber(validation.minLength);
  if (typeof minLength === 'number' && source.length < minLength) {
    return asString(messages.minLength) ?? `Minimum length is ${minLength}.`;
  }

  const maxLength = asNumber(validation.maxLength);
  if (typeof maxLength === 'number' && source.length > maxLength) {
    return asString(messages.maxLength) ?? `Maximum length is ${maxLength}.`;
  }

  const pattern = asString(validation.pattern);
  if (pattern) {
    try {
      const flags = asString(validation.patternFlags) ?? '';
      if (!new RegExp(pattern, flags).test(source)) {
        return asString(messages.pattern) ?? 'Invalid format.';
      }
    } catch {
      return 'Invalid pattern.';
    }
  }

  return undefined;
}

function validateUrl(value: JsonValue | undefined): string | undefined {
  if (value === '') {
    return undefined;
  }

  if (typeof value !== 'string') {
    return 'Expected URL string.';
  }

  try {
    new URL(value);
    return undefined;
  } catch {
    return 'Invalid URL.';
  }
}

function validateNumber(
  config: Record<string, unknown>,
  value: JsonValue | undefined,
  allowNull: boolean,
): string | undefined {
  if (value === null && allowNull) {
    return undefined;
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Expected number.';
  }

  const min = asNumber(config.min);
  if (typeof min === 'number' && value < min) {
    return `Must be at least ${min}.`;
  }

  const max = asNumber(config.max);
  if (typeof max === 'number' && value > max) {
    return `Must be at most ${max}.`;
  }

  return undefined;
}

function validateSingleOption(config: Record<string, unknown>, value: JsonValue | undefined): string | undefined {
  if (value === null) {
    return undefined;
  }

  const options = asOptions(config.options);
  return options.some((option) => deepEqual(option.value, value)) ? undefined : 'Value is not in options.';
}

function validateMultiOption(config: Record<string, unknown>, value: JsonValue | undefined): string | undefined {
  if (!Array.isArray(value)) {
    return 'Expected array.';
  }

  const options = asOptions(config.options);
  const allValid = value.every((item) => options.some((option) => deepEqual(option.value, item)));
  return allValid ? undefined : 'Array contains value outside options.';
}
