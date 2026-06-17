import React from "react";
import ReactDOM from "react-dom/client";
import { AllProviders } from "data";
import Viewer from "./Viewer";
// Same stylesheet wiring as the library/dev entry: Tailwind first, then the
// SDS foundation (see src/index.js for why the order matters).
import "../../../tailwind.css";
import "../../../index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AllProviders>
      <Viewer />
    </AllProviders>
  </React.StrictMode>,
);
