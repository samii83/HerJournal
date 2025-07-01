import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx";
import FolderView from "./pages/FolderView";
import Insights from "./pages/Insights";
import DayView from "./pages/DayView";
import Settings from "./pages/Settings";
import LockScreen from "./pages/LockScreen";
import { useAuth } from "./store/AuthContext";
import CalendarPage from "./pages/CalendarPage";



export default function App() {
  const { unlocked } = useAuth();

  if (!unlocked) {
    return <LockScreen />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white">
        <Routes>
          <Route path="/folder/:folderId" element={<FolderView />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/day/:date" element={<DayView />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="p-6">Welcome to HerJournal</div>} />
        </Routes>
      </main>
    </div>
  );
  
}
