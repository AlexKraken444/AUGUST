const DAY = 86400000;
const START = Date.UTC(2026, 7, 1);

export function clockAt(now) {
  // Calendar arithmetic must not depend on daylight saving or timezone offsets.
  const calendar = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const day = Math.floor((calendar - START) / DAY) + 1;
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const remaining = midnight.getTime() - now.getTime();
  const previous = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return {
    day,
    hours: Math.floor(remaining / 3600000),
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
    milliseconds: remaining % 1000,
    progress: (now - previous) / (midnight - previous),
  };
}
