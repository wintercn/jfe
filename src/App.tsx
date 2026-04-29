import { useEffect, useMemo, useState } from 'react';
import { formatJson, getDefaultValue } from './widgets/json';
import type { JsonValue, WidgetSpec } from './widgets/types';
import { WidgetEditor } from './widgets/WidgetEditor';

type Demo = {
  id: string;
  label: string;
  spec: WidgetSpec;
};

const demos: Demo[] = [
  {
    id: 'form',
    label: 'form',
    spec: {
      name: 'form',
      config: {
        fields: [
          {
            key: 'name',
            widget: {
              name: 'text-editor',
              config: {
                placeholder: 'name',
                defaultValue: '',
                trim: true,
                validation: {
                  minLength: 2,
                  maxLength: 24,
                },
              },
            },
          },
          {
            key: 'bio',
            widget: {
              name: 'text-editor',
              config: {
                placeholder: 'bio',
                defaultValue: '',
                multiline: true,
                trim: true,
                validation: {
                  maxLength: 160,
                },
              },
            },
          },
          {
            key: 'website',
            widget: {
              name: 'url',
              config: {
                placeholder: 'https://example.com',
                defaultValue: '',
              },
            },
          },
          {
            key: 'avatar',
            widget: {
              name: 'image',
              config: {
                placeholder: 'https://example.com/image.png',
                defaultValue: '',
              },
            },
          },
          {
            key: 'active',
            widget: {
              name: 'checkbox',
              config: {
                defaultValue: true,
                text: 'Active',
              },
            },
          },
          {
            key: 'kind',
            value: 'profile',
          },
        ],
      },
    },
  },
  {
    id: 'nested-form',
    label: 'nested form',
    spec: {
      name: 'form',
      config: {
        fields: [
          {
            key: 'profile',
            widget: {
              name: 'form',
              config: {
                fields: [
                  {
                    key: 'name',
                    widget: {
                      name: 'text-editor',
                      config: {
                        placeholder: 'name',
                        defaultValue: '',
                      },
                    },
                  },
                  {
                    key: 'contact',
                    widget: {
                      name: 'form',
                      config: {
                        fields: [
                          {
                            key: 'email',
                            widget: {
                              name: 'text-editor',
                              config: {
                                placeholder: 'email',
                                defaultValue: '',
                              },
                            },
                          },
                          {
                            key: 'website',
                            widget: {
                              name: 'url',
                              config: {
                                placeholder: 'https://example.com',
                                defaultValue: '',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            key: 'meta',
            widget: {
              name: 'form',
              config: {
                fields: [
                  {
                    key: 'active',
                    widget: {
                      name: 'checkbox',
                      config: {
                        defaultValue: true,
                        text: 'Active',
                      },
                    },
                  },
                  {
                    key: 'type',
                    value: 'nested',
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  {
    id: 'map',
    label: 'map',
    spec: {
      name: 'map',
      config: {
        valueWidget: {
          name: 'text-editor',
          config: {
            placeholder: 'value',
            defaultValue: '',
          },
        },
      },
    },
  },
  {
    id: 'list',
    label: 'list',
    spec: {
      name: 'list',
      config: {
        item: {
          name: 'text-editor',
          config: {
            placeholder: 'item',
            defaultValue: '',
          },
        },
      },
    },
  },
  {
    id: 'list-form',
    label: 'list of forms',
    spec: {
      name: 'list',
      config: {
        item: {
          name: 'form',
          config: {
            fields: [
              {
                key: 'title',
                widget: {
                  name: 'text-editor',
                  config: {
                    placeholder: 'title',
                    defaultValue: '',
                  },
                },
              },
              {
                key: 'note',
                widget: {
                  name: 'text-editor',
                  config: {
                    placeholder: 'note',
                    defaultValue: '',
                    multiline: true,
                  },
                },
              },
              {
                key: 'enabled',
                widget: {
                  name: 'checkbox',
                  config: {
                    defaultValue: true,
                    text: 'Enabled',
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    id: 'table',
    label: 'table',
    spec: {
      name: 'table',
      config: {
        columns: [
          {
            key: 'name',
            widget: {
              name: 'text-editor',
              config: {
                placeholder: 'name',
                defaultValue: '',
              },
            },
          },
          {
            key: 'qty',
            widget: {
              name: 'number-input',
              config: {
                min: 0,
                step: 1,
                defaultValue: 1,
              },
            },
          },
          {
            key: 'type',
            value: 'line',
          },
        ],
      },
    },
  },
  {
    id: 'choices',
    label: 'choices',
    spec: {
      name: 'form',
      config: {
        fields: [
          {
            key: 'select',
            widget: {
              name: 'select',
              config: {
                options: [
                  { label: 'String', value: 'string' },
                  { label: 'Number', value: 100 },
                  { label: 'Object', value: { type: 'object' } },
                ],
                defaultValue: 'string',
              },
            },
          },
          {
            key: 'radio',
            widget: {
              name: 'radio-list',
              config: {
                options: [
                  { label: 'Small', value: 's' },
                  { label: 'Medium', value: 'm' },
                  { label: 'Large', value: 'l' },
                ],
                defaultValue: 'm',
              },
            },
          },
          {
            key: 'checks',
            widget: {
              name: 'checkbox-list',
              config: {
                options: [
                  { label: 'A', value: 'a' },
                  { label: 'B', value: 'b' },
                  { label: 'C', value: 'c' },
                ],
                defaultValue: ['a'],
              },
            },
          },
        ],
      },
    },
  },
  {
    id: 'numbers',
    label: 'numbers',
    spec: {
      name: 'form',
      config: {
        fields: [
          {
            key: 'count',
            widget: {
              name: 'number-input',
              config: {
                min: 0,
                max: 100,
                step: 1,
                defaultValue: 0,
              },
            },
          },
          {
            key: 'ratio',
            widget: {
              name: 'slider',
              config: {
                min: 0,
                max: 1,
                step: 0.01,
                defaultValue: 0.5,
              },
            },
          },
        ],
      },
    },
  },
];

export function App() {
  const [selectedId, setSelectedId] = useState(demos[0].id);
  const selectedDemo = useMemo(() => demos.find((demo) => demo.id === selectedId) ?? demos[0], [selectedId]);
  const [value, setValue] = useState<JsonValue>(() => getDefaultValue(selectedDemo.spec));

  useEffect(() => {
    setValue(getDefaultValue(selectedDemo.spec));
  }, [selectedDemo]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">JFE Workbench</div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="panel-title">Widgets</div>
          <nav className="nav-list" aria-label="Widget demos">
            {demos.map((demo) => (
              <button
                className={demo.id === selectedId ? 'nav-item active' : 'nav-item'}
                key={demo.id}
                type="button"
                onClick={() => setSelectedId(demo.id)}
              >
                {demo.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="editor-pane">
          <section className="panel editor-panel">
            <div className="panel-title">{selectedDemo.label}</div>
            <WidgetEditor spec={selectedDemo.spec} value={value} onChange={setValue} />
          </section>
        </main>
        <aside className="inspector">
          <section className="panel">
            <div className="panel-title">Value</div>
            <pre className="code-block">{formatJson(value)}</pre>
          </section>
          <section className="panel">
            <div className="panel-title">DSL</div>
            <pre className="code-block">{formatJson(selectedDemo.spec)}</pre>
          </section>
        </aside>
      </div>
    </div>
  );
}
