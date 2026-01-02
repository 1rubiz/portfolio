import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Day = {
  date: string;
  contributionCount: number;
  color: string;
};

type HoverState = {
  date: string;
  count: number;
  x: number;
  y: number;
} | null;

const DARK_SCALE = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

function useDarkMode() {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setDark(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return dark;
}

function remapColor(count: number) {
  if (count === 0) return DARK_SCALE[0];
  if (count < 3) return DARK_SCALE[1];
  if (count < 6) return DARK_SCALE[2];
  if (count < 10) return DARK_SCALE[3];
  return DARK_SCALE[4];
}

function calculateStats(days: Day[]) {
  if (days.length === 0) return { total: 0, average: 0, streak: 0 };

  const total = days.reduce((acc, day) => acc + day.contributionCount, 0);
  const average = Math.round(total / days.length);

  let longestStreak = 0;
  let currentStreak = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return { total, average, streak: longestStreak };
}

export default function GithubContributions() {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverState>(null);
  const isDark = useDarkMode();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const query = `
          query ($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            query,
            variables: { login: import.meta.env.VITE_GITHUB_USERNAME },
          }),
        });

        const json = await res.json();

        if (json.errors) {
          throw new Error(json.errors[0]?.message || "Failed to fetch contributions");
        }

        const weeks =
          json.data.user.contributionsCollection.contributionCalendar.weeks;

        setDays(
          weeks.flatMap(
            (week: { contributionDays: Day[] }) => week.contributionDays
          )
        );

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const stats = useMemo(() => calculateStats(days), [days]);

  const boxes = useMemo(
    () =>
      days.map((day, i) => {
        const x = Math.floor(i / 7) * 12;
        const y = (i % 7) * 12;

        const fill = isDark
          ? remapColor(day.contributionCount)
          : day.color;

        return { ...day, x, y, fill };
      }),
    [days, isDark]
  );

  if (loading) {
    return <div className="text-sm opacity-60">Loading activity…</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Error: {error}</div>;
  }

  const dateRange = days.length > 0 ? `${days[0]?.date} to ${days[days.length - 1]?.date}` : "";

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-1">GitHub Contributions</h3>
        <p className="text-sm opacity-60">{dateRange}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
        >
          <div className="text-xs opacity-60 mb-1">Total Contributions</div>
          <div className="text-2xl font-bold text-green-500">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
        >
          <div className="text-xs opacity-60 mb-1">Daily Average</div>
          <div className="text-2xl font-bold text-blue-500">{stats.average}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
        >
          <div className="text-xs opacity-60 mb-1">Longest Streak</div>
          <div className="text-2xl font-bold text-purple-500">{stats.streak}</div>
        </motion.div>
      </div>

      {/* Contribution Graph */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 720 84"
          className="w-full"
          preserveAspectRatio="xMinYMin meet"
        >
          {boxes.map((day, i) => (
            <motion.rect
              key={day.date}
              x={day.x}
              y={day.y}
              width={10}
              height={10}
              rx={2}
              fill={day.fill}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.002,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.25 }}
              onMouseEnter={() =>
                setHover({
                  date: day.date,
                  count: day.contributionCount,
                  x: day.x,
                  y: day.y,
                })
              }
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <title>
                {day.date}: {day.contributionCount} contributions
              </title>
            </motion.rect>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 top-20 z-10 pointer-events-none text-xs bg-black/80 text-white px-3 py-2 rounded border border-white/10"
          >
            <div className="font-semibold">{hover.count} contributions</div>
            <div className="opacity-70">{hover.date}</div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs opacity-60 mb-2">Contribution Level</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: DARK_SCALE[0] }}
            />
            <span className="text-xs opacity-60">None</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: DARK_SCALE[1] }}
            />
            <span className="text-xs opacity-60">1-2</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: DARK_SCALE[2] }}
            />
            <span className="text-xs opacity-60">3-5</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: DARK_SCALE[3] }}
            />
            <span className="text-xs opacity-60">6-9</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: DARK_SCALE[4] }}
            />
            <span className="text-xs opacity-60">10+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
