import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// The single monofly stylesheet: SDS token foundation + the Tailwind/shadcn
// layer, all bundled into one file by the package. One import, every style.
import "monofly/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
