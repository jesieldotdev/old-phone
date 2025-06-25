import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KeypadProvider } from "./contexts/KeypadContext";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeypadProvider>
      <App />
    </KeypadProvider>
  </React.StrictMode>
);
