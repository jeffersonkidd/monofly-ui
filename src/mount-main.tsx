import React from "react";
import ReactDOM from "react-dom/client";
import Mount from "./Mount";
// Same stylesheet wiring as the dev/library entry: Tailwind first, then the
// SDS foundation (see src/index.js for why the order matters). Mount already
// wraps itself in <AllProviders>, so we don't double-wrap here.
import "./tailwind.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Mount />
  </React.StrictMode>,
);
