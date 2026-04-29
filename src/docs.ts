import builtinWidgets from '../docs/builtin-widgets-v0.1.md?raw';
import dsl from '../docs/dsl-v0.1.md?raw';
import checkboxList from '../docs/widgets/checkbox-list.md?raw';
import checkbox from '../docs/widgets/checkbox.md?raw';
import form from '../docs/widgets/form.md?raw';
import image from '../docs/widgets/image.md?raw';
import list from '../docs/widgets/list.md?raw';
import map from '../docs/widgets/map.md?raw';
import numberInput from '../docs/widgets/number-input.md?raw';
import radioList from '../docs/widgets/radio-list.md?raw';
import select from '../docs/widgets/select.md?raw';
import slider from '../docs/widgets/slider.md?raw';
import table from '../docs/widgets/table.md?raw';
import textEditor from '../docs/widgets/text-editor.md?raw';
import url from '../docs/widgets/url.md?raw';

export type DocEntry = {
  id: string;
  label: string;
  path: string;
  content: string;
};

export const docs: DocEntry[] = [
  {
    id: 'builtin-widgets',
    label: 'Built-in widgets',
    path: 'docs/builtin-widgets-v0.1.md',
    content: builtinWidgets,
  },
  {
    id: 'dsl',
    label: 'DSL v0.1',
    path: 'docs/dsl-v0.1.md',
    content: dsl,
  },
  {
    id: 'text-editor',
    label: 'text-editor',
    path: 'docs/widgets/text-editor.md',
    content: textEditor,
  },
  {
    id: 'url',
    label: 'url',
    path: 'docs/widgets/url.md',
    content: url,
  },
  {
    id: 'image',
    label: 'image',
    path: 'docs/widgets/image.md',
    content: image,
  },
  {
    id: 'number-input',
    label: 'number-input',
    path: 'docs/widgets/number-input.md',
    content: numberInput,
  },
  {
    id: 'slider',
    label: 'slider',
    path: 'docs/widgets/slider.md',
    content: slider,
  },
  {
    id: 'checkbox',
    label: 'checkbox',
    path: 'docs/widgets/checkbox.md',
    content: checkbox,
  },
  {
    id: 'form',
    label: 'form',
    path: 'docs/widgets/form.md',
    content: form,
  },
  {
    id: 'map',
    label: 'map',
    path: 'docs/widgets/map.md',
    content: map,
  },
  {
    id: 'list',
    label: 'list',
    path: 'docs/widgets/list.md',
    content: list,
  },
  {
    id: 'table',
    label: 'table',
    path: 'docs/widgets/table.md',
    content: table,
  },
  {
    id: 'select',
    label: 'select',
    path: 'docs/widgets/select.md',
    content: select,
  },
  {
    id: 'radio-list',
    label: 'radio-list',
    path: 'docs/widgets/radio-list.md',
    content: radioList,
  },
  {
    id: 'checkbox-list',
    label: 'checkbox-list',
    path: 'docs/widgets/checkbox-list.md',
    content: checkboxList,
  },
];
