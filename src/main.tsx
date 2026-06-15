import React from "react";
import ReactDOM from "react-dom/client";
import Mount from "./Mount.tsx";
import "./tailwind.css";
import "./index.css";
// Tailwind entry imported directly from JS (not via `@import url()` in a
// stylesheet) so the @tailwindcss/vite plugin actually compiles it.


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Mount />
  </React.StrictMode>
);
