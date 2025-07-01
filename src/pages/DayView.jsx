import { useParams } from "react-router-dom";
import { useJournals } from "../store/JournalContext";
import dayjs from "dayjs";

export default function DayView() {
  const { date } = useParams();
  const { entries } = useJournals();

  const dayEntries = entries.filter((entry) =>
    dayjs(entry.createdAt).format("YYYY-MM-DD") === date
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Entries for {date}</h1>

      {dayEntries.length === 0 ? (
        <p className="text-gray-500 italic">No journal entries on this day.</p>
      ) : (
        <div className="space-y-6">
          {dayEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <div className="text-sm text-gray-600 flex justify-between items-center">
                <span>⏰ {dayjs(entry.createdAt).format("hh:mm A")}</span>
                <span>😊 Mood: {entry.mood} {moodEmoji(entry.mood)}</span>
              </div>

              {entry.image && (
                <img
                  src={entry.image}
                  alt="Attached"
                  className="mt-3 rounded max-w-xs max-h-64 object-cover border"
                />
              )}

              {entry.audio && (
                <div className="mt-3">
                  <label className="text-sm font-medium">🎧 Voice Note:</label>
                  <audio controls src={entry.audio} className="w-full mt-1" />
                </div>
              )}

              <p
                className="mt-4 whitespace-pre-wrap text-gray-800 leading-relaxed p-4 rounded"
                style={{
                  backgroundImage: entry.backgroundImage
                    ? `url(${entry.backgroundImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: entry.backgroundImage ? "rgba(255,255,255,0.8)" : "white",
                  backdropFilter: entry.backgroundImage ? "blur(2px)" : "none",
                }}
              >
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function moodEmoji(mood) {
  if (mood >= 8) return "😄";
  if (mood >= 5) return "🙂";
  if (mood >= 3) return "😐";
  return "😞";
}
