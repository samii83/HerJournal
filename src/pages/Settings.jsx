import { useSettings } from "../store/SettingsContext";
import { useJournals } from "../store/JournalContext";
import { Feather } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const { editLockEnabled, setEditLockEnabled } = useSettings();
  const { entries, folders, replaceAllJournals } = useJournals();

  const handleExport = async () => {
    const data = {
      entries,
      folders,
      exportedAt: new Date().toISOString(),
    };

    try {
      const result = await window.ipc.invoke("journals:export", data);
      alert(result.message);
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data && data.entries && data.folders) {
            if (confirm("This will overwrite all current journals. Are you sure?")) {
              replaceAllJournals(data.entries, data.folders);
              alert("Import successful!");
            }
          } else {
            alert("Invalid backup file format.");
          }
        } catch (err) {
          alert("Failed to parse backup file.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <div className="flex items-center justify-between">
            <label htmlFor="edit-lock" className="text-gray-600">
              Lock journal entries from being edited after 24 hours
            </label>
            <div
              className={`relative inline-block w-14 h-8 rounded-full cursor-pointer transition-colors ${
                editLockEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setEditLockEnabled(!editLockEnabled)}
            >
              <span
                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  editLockEnabled ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <Feather name="download" size={18} />
              Export Journals
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              <Feather name="upload" size={18} />
              Import Journals
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Export your data to a JSON file as a backup, or import a previous backup.
          </p>
        </div>
      </div>
    </motion.div>
  );
}