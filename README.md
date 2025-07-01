# HerJournal

HerJournal is a modern, secure journaling app built with React, Electron, and TailwindCSS. It supports text, mood, images, audio, drawings, and more, with local encryption and a beautiful UI.

---

## ✨ Features

- **Rich Journal Entries:** Text, mood slider, images, background images, audio recordings, and freehand drawing.
- **Folders & Organization:** Organize entries into custom folders.
- **Calendar & Insights:** Visualize your journaling habits and streaks.
- **Lock Screen:** Password-protect your journal with SHA-256 hashing.
- **Data Export/Import:** Backup and restore your data as JSON.
- **Modern UI:** Responsive, animated interface using TailwindCSS and framer-motion.
- **Electron Desktop App:** Cross-platform support (Windows, macOS, Linux).
- **Persistent Storage:** All data is stored securely on your device using `electron-store`.

---

## 🛠️ Project Structure

```
herjournal/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components (Sidebar, JournalForm, DrawingCanvas, etc.)
│   ├── pages/             # Page components (Insights, CalendarPage, FolderView, DayView, Settings, LockScreen)
│   ├── store/             # React Contexts for Auth, Journals, Settings
│   ├── main/              # Electron main & preload scripts
│   ├── dat/               # Default folders/data
│   ├── assets/            # App assets (logo, etc.)
│   └── main.jsx           # App entrypoint (React)
├── index.html             # Main HTML file
├── package.json           # Project config and scripts
├── tailwind.config.js     # TailwindCSS config
├── vite.config.js         # Vite config
└── .github/workflows/     # GitHub Actions for CI/CD
```

---

## 🚀 Getting Started (Windows)

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/herjournal.git
cd herjournal
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and [npm](https://www.npmjs.com/) installed.

```sh
npm install
```

### 3. Run the App in Development Mode

```sh
npm run dev
```
- This starts both the Vite dev server and Electron.
- The app will open in an Electron window with hot reload.

### 4. Build the App for Windows

To package the app for Windows (requires [electron-builder](https://www.electron.build/)):

```sh
npm run build
npx electron-builder --win
```

- The distributable `.exe` and installer will be in the `dist/` or `release/` directory.

---

## 📝 Usage Highlights

- **Add Entries:** Write, attach images/audio/drawings, and select mood.
- **Drawings:** Use the built-in drawing canvas to attach sketches to your entries.
- **Export/Import:** Go to **Settings** to backup or restore your journals.
- **Lock Screen:** Set a password on first launch; required to unlock the app.
- **Settings:** Toggle edit lock, manage data, and more.

---

## ⚡️ Advanced

- **GitHub Actions:** Automated build and release workflow in `.github/workflows/release.yml`.
- **Electron Store:** Data is stored locally and securely; no cloud sync by default.
- **Customization:** Tweak Tailwind config, add new folders, or extend entry types as needed.

---

## 📦 Dependencies

- [React](https://react.dev/)
- [Electron](https://www.electronjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [framer-motion](https://www.framer.com/motion/)
- [electron-store](https://github.com/sindresorhus/electron-store)
- [lucide-react](https://lucide.dev/)
- [dayjs](https://day.js.org/)
- [uuid](https://www.npmjs.com/package/uuid)

---

## 🛡️ Security

- Passwords are hashed with SHA-256 and stored in `localStorage`.
- IPC communication is restricted and safely exposed via Electron preload.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
