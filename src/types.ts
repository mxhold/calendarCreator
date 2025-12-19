export const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DayOfTheWeek = (typeof DAYS_OF_THE_WEEK)[number];

export const MONTHS = [
  { name: "January", shortName: "Jan" },
  { name: "February", shortName: "Feb" },
  { name: "March", shortName: "Mar" },
  { name: "April", shortName: "Apr" },
  { name: "May", shortName: "May" },
  { name: "June", shortName: "Jun" },
  { name: "July", shortName: "Jul" },
  { name: "August", shortName: "Aug" },
  { name: "September", shortName: "Sep" },
  { name: "October", shortName: "Oct" },
  { name: "November", shortName: "Nov" },
  { name: "December", shortName: "Dec" },
] as const;

export type MonthName = (typeof MONTHS)[number]["name"];
export type MonthShortName = (typeof MONTHS)[number]["shortName"];

export type Entry = {
  month: MonthShortName;
  date: number;
  name: string;
  style: EntryStyle;
};

export type EntryStyle = "bold" | "birthday" | undefined;

export const MOON_PHASES = [
  "New Moon",
  "First Quarter Moon",
  "Full Moon",
  "Last Quarter Moon",
] as const;

export type MoonPhase = (typeof MOON_PHASES)[number];
