import { useParams } from "react-router-dom";
import { useJournals } from "../store/JournalContext";
import { useState } from "react";

export default function FolderView() {
  const { folderId } = useParams();
  const { getEntriesByFolder, addEntry } = useJournals();
  const entries = getEntriesByFolder(folderId);

  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [mood, setMood] = useState(3);

  const handleCreate = () => {
    if (text.trim().length >= 100) {
      addEntry(folderId, text, mood);
      setText("");
      setMood(3);
      setShowForm(false);
    } else {
      alert("Journal entry must be at least 100 characters.");
    }
  };

  return (
    <div className="p-6 space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">{folderId}</h2>
        <div className="space-x-2">
          <button className="px-3 py-1 bg-gray-100 rounded">🔍 Search</button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-3 py-1 bg-indigo-500 text-white rounded"
          >
            ➕ New Entry
          </button>
        </div>
      </div>

      {/* Journal entry form */}
      {showForm && (
        <div className="space-y-2 p-4 border rounded bg-gray-50">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Write your journal (min 100 characters)"
          />
          <div className="flex items-center gap-4">
            <label>
              Mood:
              <input
                type="range"
                min="1"
                max="5"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="ml-2"
              />
            </label>
            <span className="text-sm text-gray-500">Current mood: {mood}</span>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-1 bg-green-600 text-white rounded"
          >
            Save Entry
          </button>
        </div>
      )}

      {/* List of entries */}
      <div className="space-y-2">
        {entries.length === 0 ? (
          <p className="text-gray-400 italic">No entries in this folder yet.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="border p-3 rounded shadow-sm bg-white"
            >
              <div className="text-sm text-gray-600">
                🕒 {new Date(entry.createdAt).toLocaleString()} | Mood: {entry.mood}
              </div>
              <p className="mt-1 text-gray-800 whitespace-pre-wrap">
                {entry.text.slice(0, 300)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
