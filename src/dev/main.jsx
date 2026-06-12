// Dev harness — NOT part of the published library.
// Gives `npm run dev` a page + mount point to preview components.
// The published bundle is driven by build.lib in vite.config.js, which
// ignores this file and index.html.

import { createRoot } from 'react-dom/client';
import { Button } from '../index.js';

createRoot(document.getElementById('root')).render(
  <div style={{ padding: 0, marginTop: 0, fontFamily: 'system-ui, sans-serif' }}>
    <h1>MonoFly — dev preview</h1>
    <p>This is a simple dev preview for the MonoFly component library.</p>
    <p>MonoFly is a collection of React components for building user interfaces.</p>
    <hr />
    <p>MonoFly components are designed to be flexible and customizable. You can use them as building blocks for your UI, and style them as needed.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 16, rowGap: 16 }}>
      <Button>Hello</Button>
      <Button variant="secondary">Goodbye</Button>
      <Button variant="primary">Info</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="success">Save</Button>
      <Button variant="warning">Warning</Button>
    </div>
  </div>,
);
