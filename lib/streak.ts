export function calculateStreak(dates: Set<string>): number {
  if (dates.size === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split("T")[0];

  if (!dates.has(today) && !dates.has(yesterdayKey)) {
    return 0;
  }

  let streak = 0;
  const d = new Date();
  if (!dates.has(today)) {
    d.setDate(d.getDate() - 1);
  }

  while (true) {
    const key = d.toISOString().split("T")[0];
    if (dates.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
