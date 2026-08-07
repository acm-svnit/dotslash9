export type ZonedDateTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const DEFAULT_TIME_ZONE = "Asia/Kolkata";

function getTimeZoneOffsetMs(timeZone: string, date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const values: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") values[part.type] = part.value;
  }

  const asUTC = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return asUTC - date.getTime();
}

function zonedTimeToUtcMs(zdt: ZonedDateTime, timeZone: string) {
  const utcGuess = Date.UTC(
    zdt.year,
    zdt.month - 1,
    zdt.day,
    zdt.hour,
    zdt.minute,
    zdt.second,
  );

  let offset = getTimeZoneOffsetMs(timeZone, new Date(utcGuess));
  let utc = utcGuess - offset;

  offset = getTimeZoneOffsetMs(timeZone, new Date(utc));
  utc = utcGuess - offset;

  return utc;
}

export function getHackathonWindowUtcMs(timeZone = DEFAULT_TIME_ZONE) {
  const start: ZonedDateTime = {
    year: 2027,
    month: 3,
    day: 21,
    hour: 10,
    minute: 0,
    second: 0,
  };

  const end: ZonedDateTime = {
    year: 2027,
    month: 3,
    day: 22,
    hour: 10,
    minute: 0,
    second: 0,
  };

  return {
    timeZone,
    startUtcMs: zonedTimeToUtcMs(start, timeZone),
    endUtcMs: zonedTimeToUtcMs(end, timeZone),
  };
}

