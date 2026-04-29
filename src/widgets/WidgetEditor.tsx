import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  asBoolean,
  asColumns,
  asConfig,
  asFields,
  asNumber,
  asOptions,
  asString,
  asWidget,
  createObjectFromFields,
  createRowFromColumns,
  deepEqual,
  formatJson,
  getDefaultValue,
  isPlainObject,
  normalizeJson,
} from './json';
import type { EditorProps, JsonObject, JsonValue, WidgetSpec } from './types';
import { validateValue } from './validation';

export function WidgetEditor({ spec, value, onChange }: EditorProps) {
  switch (spec.name) {
    case 'text-editor':
      return <TextInput spec={spec} value={value} onChange={onChange} />;
    case 'url':
      return <UrlInput spec={spec} value={value} onChange={onChange} />;
    case 'image':
      return <ImageInput spec={spec} value={value} onChange={onChange} />;
    case 'number-input':
      return <NumberInput spec={spec} value={value} onChange={onChange} />;
    case 'slider':
      return <SliderInput spec={spec} value={value} onChange={onChange} />;
    case 'checkbox':
      return <CheckboxInput spec={spec} value={value} onChange={onChange} />;
    case 'select':
      return <SelectInput spec={spec} value={value} onChange={onChange} />;
    case 'radio-list':
      return <RadioList spec={spec} value={value} onChange={onChange} />;
    case 'checkbox-list':
      return <CheckboxList spec={spec} value={value} onChange={onChange} />;
    case 'form':
      return <FormEditor spec={spec} value={value} onChange={onChange} />;
    case 'map':
      return <MapEditor spec={spec} value={value} onChange={onChange} />;
    case 'list':
      return <ListEditor spec={spec} value={value} onChange={onChange} />;
    case 'table':
      return <TableEditor spec={spec} value={value} onChange={onChange} />;
    case 'dialog':
      return <DialogEditor spec={spec} value={value} onChange={onChange} />;
    default:
      return (
        <div className="unknown-widget">
          <code>{spec.name}</code>
        </div>
      );
  }
}

function TextInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const displayValue = asString(value) ?? asString(config.defaultValue) ?? '';
  const error = validateValue(spec, displayValue);
  const multiline = config.multiline === true;
  const commitTrim = (nextValue: string) => {
    if (config.trim === true) {
      onChange(nextValue.trim());
    }
  };

  return (
    <FieldShell error={error}>
      {multiline ? (
        <textarea
          className="control textarea-control"
          value={displayValue}
          placeholder={asString(config.placeholder) ?? ''}
          onBlur={() => commitTrim(displayValue)}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="control"
          type="text"
          value={displayValue}
          placeholder={asString(config.placeholder) ?? ''}
          onBlur={() => commitTrim(displayValue)}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </FieldShell>
  );
}

function UrlInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const displayValue = asString(value) ?? asString(config.defaultValue) ?? '';
  const error = validateValue(spec, displayValue);

  return (
    <FieldShell error={error}>
      <input
        className="control"
        type="url"
        value={displayValue}
        placeholder={asString(config.placeholder) ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}

function ImageInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const displayValue = asString(value) ?? asString(config.defaultValue) ?? '';
  const error = validateValue(spec, displayValue);

  return (
    <FieldShell error={error}>
      <input
        className="control"
        type="url"
        value={displayValue}
        placeholder={asString(config.placeholder) ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
      {displayValue ? (
        <div className="image-preview">
          <img src={displayValue} alt="" />
        </div>
      ) : null}
    </FieldShell>
  );
}

function NumberInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const numericValue = asNumber(value) ?? asNumber(config.defaultValue);
  const error = validateValue(spec, numericValue ?? null);

  return (
    <FieldShell error={error}>
      <input
        className="control"
        type="number"
        min={asNumber(config.min)}
        max={asNumber(config.max)}
        step={asNumber(config.step) ?? 'any'}
        value={numericValue ?? ''}
        onChange={(event) => {
          const next = event.target.value;
          onChange(next === '' ? null : Number(next));
        }}
      />
    </FieldShell>
  );
}

function SliderInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const min = asNumber(config.min) ?? 0;
  const max = asNumber(config.max) ?? 100;
  const step = asNumber(config.step) ?? 1;
  const numericValue = clamp(asNumber(value) ?? asNumber(config.defaultValue) ?? min, min, max);
  const error = validateValue(spec, numericValue);

  return (
    <FieldShell error={error}>
      <div className="slider-row">
        <input
          className="slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <output className="number-readout">{numericValue}</output>
      </div>
    </FieldShell>
  );
}

function CheckboxInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const checked = asBoolean(value) ?? asBoolean(config.defaultValue) ?? false;
  const text = asString(config.text);
  const error = validateValue(spec, checked);

  return (
    <FieldShell error={error}>
      <label className="check-line">
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        {text ? <span>{text}</span> : null}
      </label>
    </FieldShell>
  );
}

function SelectInput({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const options = asOptions(config.options);
  const selectedValue = value === undefined && 'defaultValue' in config ? normalizeJson(config.defaultValue) : value;
  const selectedIndex = options.findIndex((option) => deepEqual(option.value, selectedValue));
  const error = validateValue(spec, selectedIndex >= 0 ? options[selectedIndex].value : null);

  return (
    <FieldShell error={error}>
      <select
        className="control"
        value={selectedIndex >= 0 ? String(selectedIndex) : ''}
        onChange={(event) => {
          const index = Number(event.target.value);
          onChange(Number.isInteger(index) && options[index] ? options[index].value : null);
        }}
      >
        <option value="">Empty</option>
        {options.map((option, index) => (
          <option key={index} value={String(index)}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function RadioList({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const options = asOptions(config.options);
  const selectedValue = value === undefined && 'defaultValue' in config ? normalizeJson(config.defaultValue) : value;
  const selectedIndex = options.findIndex((option) => deepEqual(option.value, selectedValue));
  const error = validateValue(spec, selectedIndex >= 0 ? options[selectedIndex].value : null);

  return (
    <FieldShell error={error}>
      <div className="choice-list">
        {options.map((option, index) => (
          <label className="choice" key={index}>
            <input
              type="radio"
              checked={selectedIndex === index}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </FieldShell>
  );
}

function CheckboxList({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const options = asOptions(config.options);
  const defaultValue = Array.isArray(config.defaultValue) ? config.defaultValue.map(normalizeJson) : [];
  const selectedValues = Array.isArray(value) ? value : defaultValue;
  const error = validateValue(spec, selectedValues);

  return (
    <FieldShell error={error}>
      <div className="choice-list">
        {options.map((option, index) => {
          const checked = selectedValues.some((item) => deepEqual(item, option.value));
          return (
            <label className="choice" key={index}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  const next = checked
                    ? selectedValues.filter((item) => !deepEqual(item, option.value))
                    : [...selectedValues, option.value];
                  const ordered = options
                    .filter((candidate) => next.some((item) => deepEqual(item, candidate.value)))
                    .map((candidate) => candidate.value);
                  onChange(ordered);
                }}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </FieldShell>
  );
}

function FormEditor({ spec, value, onChange }: EditorProps) {
  const fields = asFields(asConfig(spec).fields);
  const current = isPlainObject(value) ? value : {};
  const output = createObjectFromFields(fields, current);

  return (
    <div className="compound">
      {fields.map((field, index) => {
        if ('value' in field) {
          return (
            <div className="field-row" key={`${field.key}-${index}`}>
              <div className="field-label">{field.key}</div>
              <code className="fixed-value">{formatJson(field.value)}</code>
            </div>
          );
        }

        return (
          <div
            className={isBlockWidget(field.widget) ? 'field-row compound-field-row' : 'field-row'}
            key={`${field.key}-${index}`}
          >
            <div className="field-label">{field.key}</div>
            <WidgetEditor
              spec={field.widget}
              value={output[field.key]}
              onChange={(nextValue) => {
                onChange(createObjectFromFields(fields, { ...output, [field.key]: nextValue }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

type MapRow = {
  id: string;
  key: string;
  value: JsonValue;
};

function MapEditor({ spec, value, onChange }: EditorProps) {
  const valueWidget = asWidget(asConfig(spec).valueWidget) ?? { name: 'text-editor', config: { defaultValue: '' } };
  const valueSignature = useMemo(() => formatJson(value), [value]);
  const [rows, setRows] = useState<MapRow[]>(() => rowsFromMapValue(value, valueWidget));

  useEffect(() => {
    setRows(rowsFromMapValue(value, valueWidget));
  }, [valueSignature, valueWidget.name]);

  function commit(nextRows: MapRow[]) {
    setRows(nextRows);
    const nextValue: JsonObject = {};
    nextRows.forEach((row) => {
      if (row.key !== '') {
        nextValue[row.key] = row.value;
      }
    });
    onChange(nextValue);
  }

  return (
    <div className="compound">
      {rows.map((row) => (
        <div className="kv-row" key={row.id}>
          <input
            className="control key-control"
            value={row.key}
            placeholder="key"
            onChange={(event) => {
              commit(rows.map((item) => (item.id === row.id ? { ...item, key: event.target.value } : item)));
            }}
          />
          <WidgetEditor
            spec={valueWidget}
            value={row.value}
            onChange={(nextValue) => {
              commit(rows.map((item) => (item.id === row.id ? { ...item, value: nextValue } : item)));
            }}
          />
          <button className="icon-button danger" type="button" onClick={() => commit(rows.filter((item) => item.id !== row.id))}>
            -
          </button>
        </div>
      ))}
      <button
        className="small-button"
        type="button"
        onClick={() => commit([...rows, { id: createId(), key: '', value: getDefaultValue(valueWidget) }])}
      >
        Add
      </button>
    </div>
  );
}

function ListEditor({ spec, value, onChange }: EditorProps) {
  const itemWidget = asWidget(asConfig(spec).item) ?? { name: 'text-editor', config: { defaultValue: '' } };
  const items = Array.isArray(value) ? value : [];

  return (
    <div className="compound">
      {items.map((item, index) => (
        <div className={isBlockWidget(itemWidget) ? 'array-row array-block-row' : 'array-row'} key={index}>
          <div className="array-row-header">
            <div className="index-cell">{index + 1}</div>
            <RowButtons
              index={index}
              length={items.length}
              onMove={(from, to) => onChange(moveItem(items, from, to))}
              onRemove={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            />
          </div>
          <WidgetEditor
            spec={itemWidget}
            value={item}
            onChange={(nextValue) => {
              onChange(items.map((current, itemIndex) => (itemIndex === index ? nextValue : current)));
            }}
          />
        </div>
      ))}
      <button className="small-button" type="button" onClick={() => onChange([...items, getDefaultValue(itemWidget)])}>
        Add
      </button>
    </div>
  );
}

function TableEditor({ spec, value, onChange }: EditorProps) {
  const columns = asColumns(asConfig(spec).columns);
  const visibleColumns = columns.filter((column) => 'widget' in column);
  const rows = Array.isArray(value) ? value : [];

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            {visibleColumns.map((column, index) => (
              <th key={`${column.key}-${index}`}>{column.key}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowObject = isPlainObject(row) ? row : {};
            const output = createRowFromColumns(columns, rowObject);

            return (
              <tr key={rowIndex}>
                <td className="table-index-cell">
                  <span>{rowIndex + 1}</span>
                </td>
                {visibleColumns.map((column, columnIndex) => (
                  <td key={`${column.key}-${columnIndex}`}>
                    <WidgetEditor
                      spec={column.widget}
                      value={output[column.key]}
                      onChange={(nextValue) => {
                        const nextRow = createRowFromColumns(columns, { ...output, [column.key]: nextValue });
                        onChange(rows.map((current, index) => (index === rowIndex ? nextRow : current)));
                      }}
                    />
                  </td>
                ))}
                <td>
                  <RowButtons
                    index={rowIndex}
                    length={rows.length}
                    onMove={(from, to) => onChange(moveItem(rows, from, to))}
                    onRemove={() => onChange(rows.filter((_, index) => index !== rowIndex))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="small-button" type="button" onClick={() => onChange([...rows, createRowFromColumns(columns)])}>
        Add
      </button>
    </div>
  );
}

function DialogEditor({ spec, value, onChange }: EditorProps) {
  const config = asConfig(spec);
  const childWidget = asWidget(config.widget) ?? { name: 'text-editor', config: { defaultValue: '' } };
  const currentValue = value === undefined ? getDefaultValue(childWidget) : value;
  const valueSignature = useMemo(() => formatJson(currentValue), [currentValue]);
  const title = asString(config.title) ?? 'Edit';
  const buttonText = asString(config.buttonText) ?? title;
  const saveText = asString(config.saveText) ?? 'Save';
  const cancelText = asString(config.cancelText) ?? 'Cancel';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<JsonValue>(() => currentValue);

  useEffect(() => {
    if (!open) {
      setDraft(currentValue);
    }
  }, [childWidget.name, open, valueSignature]);

  return (
    <div className="dialog-widget">
      <button
        className="small-button"
        type="button"
        onClick={() => {
          setDraft(currentValue);
          setOpen(true);
        }}
      >
        {buttonText}
      </button>
      {open ? (
        <div className="dialog-backdrop" role="presentation">
          <div className="dialog-panel" role="dialog" aria-modal="true" aria-label={title}>
            <div className="dialog-header">
              <div className="dialog-title">{title}</div>
              <button className="icon-button" type="button" aria-label="Close" onClick={() => setOpen(false)}>
                x
              </button>
            </div>
            <div className="dialog-body">
              <WidgetEditor spec={childWidget} value={draft} onChange={setDraft} />
            </div>
            <div className="dialog-footer">
              <button className="secondary-action" type="button" onClick={() => setOpen(false)}>
                {cancelText}
              </button>
              <button
                className="primary-action"
                type="button"
                onClick={() => {
                  onChange(draft);
                  setOpen(false);
                }}
              >
                {saveText}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FieldShell({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div className="field-shell">
      {children}
      {error ? <div className="error-text">{error}</div> : null}
    </div>
  );
}

function RowButtons({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="row-actions">
      <button className="icon-button" type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)}>
        up
      </button>
      <button className="icon-button" type="button" disabled={index === length - 1} onClick={() => onMove(index, index + 1)}>
        down
      </button>
      <button className="icon-button danger" type="button" onClick={onRemove}>
        -
      </button>
    </div>
  );
}

function rowsFromMapValue(value: JsonValue | undefined, valueWidget: WidgetSpec): MapRow[] {
  if (!isPlainObject(value)) {
    return [];
  }

  return Object.entries(value).map(([key, item]) => ({
    id: createId(),
    key,
    value: item ?? getDefaultValue(valueWidget),
  }));
}

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isBlockWidget(spec: WidgetSpec): boolean {
  if (['form', 'map', 'list', 'table'].includes(spec.name)) {
    return true;
  }

  return spec.name === 'text-editor' && asConfig(spec).multiline === true;
}

function createId(): string {
  return Math.random().toString(36).slice(2);
}
