import { Link } from "react-router-dom";
import { useJournals } from "../store/JournalContext";

export default function Sidebar() {
  const { folders } = useJournals();

  return (
    <div className="w-64 bg-gray-100 border-r p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">HerJournal</h1>

      <nav className="flex flex-col gap-2">
        <Link
          to="/insights"
          className="block p-2 rounded hover:bg-blue-100 transition"
        >
          📊 Insights
        </Link>

        <Link
          to="/calendar"
          className="block p-2 rounded hover:bg-blue-100 transition"
        >
          📅 Calendar
        </Link>

        <div className="mt-4 border-t pt-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Folders
          </h2>

          {folders.map((folder) => (
            <Link
              key={folder.id}
              to={`/folder/${folder.id}`}
              className="block p-2 rounded hover:bg-blue-50"
            >
              📔 {folder.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t">
          <Link
            to="/settings"
            className="block p-2 rounded hover:bg-blue-100 transition"
          >
            ⚙️ Settings
          </Link>
        </div>
      </nav>
    </div>
  );
}
