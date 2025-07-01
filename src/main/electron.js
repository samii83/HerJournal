import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "node:path";
import fs from "node:fs/promises";
import Store from "electron-store";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize electron-store
const store = new Store();

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// IPC handler for exporting journals
ipcMain.handle("journals:export", async (event, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Export Journals",
    defaultPath: `herjournal-backup-${Date.now()}.json`,
    filters: [{ name: "JSON Files", extensions: ["json"] }],
  });

  if (canceled || !filePath) {
    return { success: false, message: "Export canceled." };
  }

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return { success: true, message: `Export successful to ${filePath}` };
  } catch (error) {
    console.error("Failed to export journals:", error);
    return { success: false, message: `Export failed: ${error.message}` };
  }
});


// IPC handlers for electron-store
ipcMain.handle('electron-store-get', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('electron-store-set', async (event, key, value) => {
  store.set(key, value);
});

// Load journals from disk
ipcMain.handle('journals:load', () => {
  return store.get('journals', []);
});

// Save journals to disk
ipcMain.handle('journals:save', (_event, data) => {
  store.set('journals', data);
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);