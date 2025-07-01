import { createContext, useContext, useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    const savedHash = localStorage.getItem("herjournal_password");
    if (savedHash) setHasPassword(true);
  }, []);

  const setPassword = (password) => {
    const hash = sha256(password).toString();
    localStorage.setItem("herjournal_password", hash);
    setUnlocked(true);
    setHasPassword(true);
  };

  const checkPassword = (password) => {
    const savedHash = localStorage.getItem("herjournal_password");
    const enteredHash = sha256(password).toString();
    if (enteredHash === savedHash) {
      setUnlocked(true);
      return true;
    } else {
      return false;
    }
  };

  const resetPassword = () => {
    localStorage.removeItem("herjournal_password");
    setUnlocked(false);
    setHasPassword(false);
  };

  return (
    <AuthContext.Provider
      value={{ unlocked, hasPassword, setPassword, checkPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
