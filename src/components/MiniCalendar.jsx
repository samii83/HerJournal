import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function MiniCalendar({ markedDays = [] }) {
  const today = dayjs();
  const start = today.startOf("month").startOf("week");
  const end = today.endOf("month").endOf("week");

  const days = [];
  let current = start;

  while (current.isBefore(end)) {
    days.push(current);
    current = current.add(1, "day");
  }

  const isMarked = (dateStr) => markedDays.includes(dateStr);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-1 text-sm">
        {days.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const isToday = day.isSame(dayjs(), "day");

          return (
            <Link to={`/day/${dateStr}`} key={dateStr}>
              <div
                className={`p-1 rounded-md hover:bg-blue-50 transition duration-150 ${
                  isToday ? "bg-blue-100 font-bold" : ""
                }`}
              >
                <div>{day.date()}</div>
                {isMarked(dateStr) && (
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mx-auto mt-1" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
