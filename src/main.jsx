import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Context providers
import { AuthProvider } from "./store/AuthContext";
import { SettingsProvider } from "./store/SettingsContext";
import { JournalProvider } from "./store/JournalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <JournalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </JournalProvider>
      </SettingsProvider>
    </AuthProvider>
  </StrictMode>
);
