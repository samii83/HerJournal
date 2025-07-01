import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJournals } from "../store/JournalContext";
import dayjs from "dayjs";

export default function CalendarPage() {
  const { entries } = useJournals();
  const navigate = useNavigate();
  const [viewDate, setViewDate] = useState(dayjs());

  const start = viewDate.startOf("month").startOf("week");
  const end = viewDate.endOf("month").endOf("week");

  const markedDates = new Set(
    entries.map((e) => dayjs(e.createdAt).format("YYYY-MM-DD"))
  );

  const days = [];
  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    days.push(current);
    current = current.add(1, "day");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📅 Full Calendar View</h1>

      <div className="flex justify-between mb-4 items-center">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setViewDate(viewDate.subtract(1, "month"))}
        >
          ← Previous
        </button>

        <span className="font-semibold text-lg">
          {viewDate.format("MMMM YYYY")}
        </span>

        <button
          className="text-blue-600 hover:underline"
          onClick={() => setViewDate(viewDate.add(1, "month"))}
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-gray-600">{d}</div>
        ))}

        {days.map((d) => {
          const dateStr = d.format("YYYY-MM-DD");
          const isMarked = markedDates.has(dateStr);
          const isToday = d.isSame(dayjs(), "day");

          return (
            <div
              key={dateStr}
              className={`p-2 rounded-lg cursor-pointer hover:bg-blue-50 ${
                isToday ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => navigate(`/day/${dateStr}`)}
            >
              <div>{d.date()}</div>
              {isMarked && (
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mx-auto mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
