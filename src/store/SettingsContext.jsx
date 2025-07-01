import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [editLockEnabled, setEditLockEnabled] = useState(true);

  return (
    <SettingsContext.Provider value={{ editLockEnabled, setEditLockEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
