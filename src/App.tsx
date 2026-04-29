import { useEffect, useMemo, useState } from 'react';
import { docs } from './docs';
import { formatJson, getDefaultValue } from './widgets/json';
import type { JsonValue, WidgetSpec } from './widgets/types';
import { WidgetEditor } from './widgets/WidgetEditor';

type Demo = {
  id: string;
  label: string;
  spec: WidgetSpec;
};

type Mode = 'home' | 'cases' | 'docs';

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
  const [mode, setMode] = useState<Mode>('home');
  const [selectedId, setSelectedId] = useState(demos[0].id);
  const selectedDemo = useMemo(() => demos.find((demo) => demo.id === selectedId) ?? demos[0], [selectedId]);
  const [selectedDocId, setSelectedDocId] = useState(docs[0].id);
  const selectedDoc = useMemo(
    () => docs.find((doc) => doc.id === selectedDocId) ?? docs[0],
    [selectedDocId],
  );
  const [value, setValue] = useState<JsonValue>(() => getDefaultValue(selectedDemo.spec));

  useEffect(() => {
    setValue(getDefaultValue(selectedDemo.spec));
  }, [selectedDemo]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">JFE Workbench</div>
        <div className="top-tabs" role="tablist" aria-label="Site sections">
          <button
            className={mode === 'home' ? 'top-tab active' : 'top-tab'}
            type="button"
            onClick={() => setMode('home')}
          >
            Home
          </button>
          <button
            className={mode === 'cases' ? 'top-tab active' : 'top-tab'}
            type="button"
            onClick={() => setMode('cases')}
          >
            Cases
          </button>
          <button
            className={mode === 'docs' ? 'top-tab active' : 'top-tab'}
            type="button"
            onClick={() => setMode('docs')}
          >
            Docs
          </button>
        </div>
      </header>
      {mode === 'home' ? (
        <HomePage
          onOpenCase={(id) => {
            setSelectedId(id);
            setMode('cases');
          }}
          onOpenDoc={(id) => {
            setSelectedDocId(id);
            setMode('docs');
          }}
        />
      ) : (
      <div className="workspace">
        <aside className="sidebar">
          {mode === 'cases' ? (
            <>
              <div className="panel-title">Cases</div>
              <nav className="nav-list" aria-label="Widget cases">
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
            </>
          ) : (
            <>
              <div className="panel-title">Docs</div>
              <nav className="nav-list" aria-label="Documentation">
                {docs.map((doc) => (
                  <button
                    className={doc.id === selectedDocId ? 'nav-item active' : 'nav-item'}
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedDocId(doc.id)}
                  >
                    {doc.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </aside>
        <main className="editor-pane">
          {mode === 'cases' ? (
            <section className="panel editor-panel">
              <div className="panel-title">{selectedDemo.label}</div>
              <WidgetEditor spec={selectedDemo.spec} value={value} onChange={setValue} />
            </section>
          ) : (
            <section className="panel doc-panel">
              <div className="panel-title">{selectedDoc.label}</div>
              <MarkdownDoc content={selectedDoc.content} />
            </section>
          )}
        </main>
        <aside className="inspector">
          {mode === 'cases' ? (
            <>
              <section className="panel">
                <div className="panel-title">Value</div>
                <pre className="code-block">{formatJson(value)}</pre>
              </section>
              <section className="panel">
                <div className="panel-title">DSL</div>
                <pre className="code-block">{formatJson(selectedDemo.spec)}</pre>
              </section>
            </>
          ) : (
            <>
              <section className="panel">
                <div className="panel-title">File</div>
                <pre className="code-block">{selectedDoc.path}</pre>
              </section>
              <section className="panel">
                <div className="panel-title">Markdown</div>
                <pre className="code-block">{selectedDoc.content}</pre>
              </section>
            </>
          )}
        </aside>
      </div>
      )}
    </div>
  );
}

function HomePage({
  onOpenCase,
  onOpenDoc,
}: {
  onOpenCase: (id: string) => void;
  onOpenDoc: (id: string) => void;
}) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="eyebrow">JSON visual editor DSL</div>
          <h1>Build structured JSON editors from composable widget definitions.</h1>
          <p>
            JFE turns a small declarative DSL into a working editor. Start with scalar widgets,
            compose object and array editors, then inspect the output JSON beside the UI.
          </p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => onOpenCase('form')}>
              Open cases
            </button>
            <button className="secondary-action" type="button" onClick={() => onOpenDoc('overview')}>
              Read docs
            </button>
          </div>
        </div>
        <div className="hero-preview" aria-label="DSL preview">
          <div className="preview-title">form DSL</div>
          <pre>{`{
  "name": "form",
  "config": {
    "fields": [
      {
        "key": "title",
        "widget": {
          "name": "text-editor"
        }
      },
      {
        "key": "type",
        "value": "article"
      }
    ]
  }
}`}</pre>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Core model</h2>
          <p>Everything is a widget. Complex editors are recursive compositions of smaller widgets.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-kicker">Scalar</div>
            <h3>Text, number, boolean, URL, image</h3>
            <p>Primitive widgets produce primitive JSON values and keep validation local to the field.</p>
          </div>
          <div className="feature-card">
            <div className="feature-kicker">Object</div>
            <h3>form and map</h3>
            <p>Use fixed fields for known object shapes, or editable keys for dynamic key-value objects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-kicker">Array</div>
            <h3>list, table, checkbox-list</h3>
            <p>Edit repeated values, object rows, or option arrays while preserving JSON output order.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Try the important cases</h2>
          <p>These examples cover nesting, fixed values, object arrays, and arbitrary option values.</p>
        </div>
        <div className="case-grid">
          <HomeCard title="Nested form" action="Open nested form" onClick={() => onOpenCase('nested-form')}>
            Object fields can contain another form, and each layer contributes to the final JSON object.
          </HomeCard>
          <HomeCard title="List of forms" action="Open list of forms" onClick={() => onOpenCase('list-form')}>
            A list item can be a full form, producing an array of structured objects.
          </HomeCard>
          <HomeCard title="Table" action="Open table" onClick={() => onOpenCase('table')}>
            Table rows are objects. Fixed value columns participate in output without being rendered.
          </HomeCard>
          <HomeCard title="Choices" action="Open choices" onClick={() => onOpenCase('choices')}>
            Select and radio options can output strings, numbers, booleans, arrays, or objects.
          </HomeCard>
        </div>
      </section>

      <section className="home-section docs-band">
        <div>
          <h2>Documentation</h2>
          <p>Read the overview first, then use the widget catalog as the implementation contract.</p>
        </div>
        <div className="docs-actions">
          <button className="secondary-action" type="button" onClick={() => onOpenDoc('overview')}>
            Overview
          </button>
          <button className="secondary-action" type="button" onClick={() => onOpenDoc('builtin-widgets')}>
            Widget catalog
          </button>
          <button className="secondary-action" type="button" onClick={() => onOpenDoc('examples')}>
            Examples
          </button>
        </div>
      </section>
    </main>
  );
}

function HomeCard({
  title,
  action,
  children,
  onClick,
}: {
  title: string;
  action: string;
  children: string;
  onClick: () => void;
}) {
  return (
    <div className="home-card">
      <h3>{title}</h3>
      <p>{children}</p>
      <button className="text-action" type="button" onClick={onClick}>
        {action}
      </button>
    </div>
  );
}

function MarkdownDoc({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <article className="markdown-doc">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return block.level === 1 ? (
              <h1 key={index}>{renderInline(block.text)}</h1>
            ) : (
              <h2 key={index}>{renderInline(block.text)}</h2>
            );
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case 'code':
            return (
              <pre className="doc-code" key={index}>
                <code>{block.code}</code>
              </pre>
            );
          case 'paragraph':
            return <p key={index}>{renderInline(block.text)}</p>;
        }
      })}
    </article>
  );
}

type MarkdownBlock =
  | { type: 'heading'; level: 1 | 2; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; code: string };

function parseMarkdown(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = content.split('\n');
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] | undefined;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: 'list', items: list });
      list = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      flushParagraph();
      flushList();
      if (code) {
        blocks.push({ type: 'code', code: code.join('\n') });
        code = undefined;
      } else {
        code = [];
      }
      return;
    }

    if (code) {
      code.push(line);
      return;
    }

    if (line.trim() === '') {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: 1, text: line.slice(2) });
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) });
      return;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      list.push(line.slice(2));
      return;
    }

    paragraph.push(line.trim());
  });

  flushParagraph();
  flushList();

  if (code) {
    blocks.push({ type: 'code', code: code.join('\n') });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a href={link[2]} key={index}>
          {link[1]}
        </a>
      );
    }

    return part;
  });
}
