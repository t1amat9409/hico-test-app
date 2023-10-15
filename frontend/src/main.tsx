import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import App from "./App";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from "./theme";
import { EmployeeProvider } from "./contexts/EmployeeContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
