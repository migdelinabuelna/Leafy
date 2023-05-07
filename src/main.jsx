import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//This is our main app, and where we import our react semantic link after install
import 'semantic-ui-css/semantic.min.css';
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
