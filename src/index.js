// Public entry point. Everything exported here is importable from
// `monofly` inside Figma Make.
//
// Importing the CSS here means a single `import 'monofly/styles.css'`
// in the Make project pulls in all component styles.

import './styles.css';

export { Button } from './Button/Button.jsx';
