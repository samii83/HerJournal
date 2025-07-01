import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { Lock, Shield } from "lucide-react";

export default function LockScreen() {
  const { hasPassword, setPassword, checkPassword } = useAuth();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (hasPassword) {
      const ok = checkPassword(input);
      if (!ok) {
        setError("Incorrect password. Please try again.");
      }
    } else {
      if (input.length < 4) {
        setError("Password must be at least 4 characters long.");
        return;
      }
      setPassword(input);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <Shield size={48} className="mx-auto text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">HerJournal</h1>
            <p className="text-gray-500">
              {hasPassword ? "Your journal is locked." : "Create a password to secure your journal."}
            </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasPassword ? "Enter your password" : "Choose a strong password"}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition shadow-md"
          >
            {hasPassword ? "Unlock" : "Set Password & Unlock"}
          </button>
        </form>

        {hasPassword && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                if (confirm("This will permanently delete all your journals and reset the app. Are you sure?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="text-sm text-gray-500 hover:text-red-600 hover:underline"
            >
              Forgot password? Reset app
            </button>
          </div>
        )}
      </div>
    </div>
  );
}