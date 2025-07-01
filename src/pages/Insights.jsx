import { useJournals } from "../store/JournalContext";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek);

function getStreaks(dates) {
  const sorted = [...dates].sort();
  let currentStreak = 1;
  let longest = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = dayjs(sorted[i - 1]);
    const curr = dayjs(sorted[i]);
    if (curr.diff(prev, "day") === 1) {
      currentStreak += 1;
      longest = Math.max(longest, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return { longest, current: currentStreak };
}

export default function Insights() {
  const { entries } = useJournals();

  const daysSet = new Set(entries.map((e) => dayjs(e.createdAt).format("YYYY-MM-DD")));
  const dayList = Array.from(daysSet).sort();

  const wordCount = entries.reduce((sum, e) => sum + (e.text?.split(/\s+/).length || 0), 0);
  const { longest, current } = getStreaks(dayList);

  const journaledDays = dayList.length;
  const entryCount = entries.length;

  const thisWeek = dayList.filter((d) => dayjs(d).isoWeek() === dayjs().isoWeek()).length;
  const thisMonth = dayList.filter((d) => dayjs(d).month() === dayjs().month()).length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">📈 Insights & Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="🔥 Current Streak" value={current + " days"} />
        <StatCard title="🏆 Longest Streak" value={longest + " days"} />
        <StatCard title="🗓️ Days Journaled This Week" value={thisWeek} />
        <StatCard title="📆 Days This Month" value={thisMonth} />
        <StatCard title="📝 Total Entries" value={entryCount} />
        <StatCard title="✍️ Total Words" value={wordCount} />
        <StatCard title="📅 Total Days Journaled" value={journaledDays} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
