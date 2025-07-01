import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ipc = window.api;

const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [folders, setFolders] = useState([{ id: "diary", name: "Diary" }]);

  useEffect(() => {
    if (!ipc || typeof ipc.invoke !== "function") {
      console.error(
        "IPC is not available. Make sure you are running in Electron and the preload script is loaded."
      );
      return;
    }
    ipc
      .invoke("journals:load")
      .then((stored) => {
        if (stored?.entries) setEntries(stored.entries);
        if (stored?.folders) setFolders(stored.folders);
      })
      .catch((err) => {
        console.error("Failed to load journals:", err);
      });
  }, []);

  useEffect(() => {
    if (!ipc || typeof ipc.invoke !== "function") return;
    if (entries.length > 0 || folders.length > 0) {
      ipc
        .invoke("journals:save", { entries, folders })
        .catch((err) => {
          console.error("Failed to save journals:", err);
        });
    }
  }, [entries, folders]);

  const addEntry = (folderId, text, mood, image = null, audio = null, backgroundImage = null) => {
    const newEntry = {
      id: uuidv4(),
      folderId,
      text,
      mood,
      image,
      audio,
      backgroundImage,
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const getEntriesByFolder = (folderId) =>
    entries.filter((entry) => entry.folderId === folderId);

  const replaceAllJournals = (data) => {
    if (!data) return;
    setFolders(data.folders || []);
    setEntries(data.entries || []);
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        setEntries,
        addEntry,
        getEntriesByFolder,
        folders,
        setFolders,
        replaceAllJournals,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournals() {
  return useContext(JournalContext);
}
