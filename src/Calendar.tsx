import firstQuarter from "./assets/firstQuarter.svg";
import lastQuarter from "./assets/lastQuarter.svg";
import fullMoon from "./assets/fullMoon.svg";
import newMoon from "./assets/newMoon.svg";
import cake from "./assets/cake.svg";
import { Fragment } from "react/jsx-runtime";
import {
  DAYS_OF_THE_WEEK,
  MONTHS,
  MOON_PHASES,
  type DayOfTheWeek,
  type Entry,
  type MonthName,
  type MoonPhase,
} from "./types";

function MoonIcon({ phase }: { phase: MoonPhase }) {
  const src =
    phase == "First Quarter Moon"
      ? firstQuarter
      : phase == "Full Moon"
      ? fullMoon
      : phase == "Last Quarter Moon"
      ? lastQuarter
      : newMoon;
  return <img width={12} src={src} />;
}

interface DayProps {
  date: number;
  bold: boolean;
  birthday?: string;
  moonPhase?: MoonPhase;
  holidays: {
    name: string;
    bold: boolean;
  }[];
}

function Day({ day }: { day: DayProps | null }) {
  if (day == null) {
    return <td></td>;
  }
  return (
    <td className=" h-full">
      <div className="flex flex-col justify-between h-full text-[8.5px]">
        <div className={`grow flex justify-between`}>
          <div
            className={`pl-1 pt-0.5 text-lg leading-none ${
              day.bold ? "font-bold" : ""
            }`}
          >
            {day.date}
          </div>
          {day.birthday ? (
            <div className="inline-flex items-start mt-1 gap-px">
              <img className="mt-px" src={cake} width={9} />
              {day.birthday}
            </div>
          ) : (
            <></>
          )}
          <div className="pt-0.75 pr-1.25">
            {day.moonPhase ? <MoonIcon phase={day.moonPhase} /> : ""}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center leading-[1.1] mb-0.5 text-balance">
          {day.holidays.map((holiday) => {
            return (
              <div
                key={holiday.name}
                className={holiday.bold ? "font-bold" : ""}
              >
                {holiday.name}
              </div>
            );
          })}
        </div>
      </div>
    </td>
  );
}

function monthLength(year: number, month: MonthName): number {
  return new Date(
    year,
    MONTHS.findIndex((m) => m.name == month) + 1,
    0 // Gives last day of previous month
  ).getDate();
}

function monthStartsOn(year: number, month: MonthName): DayOfTheWeek {
  const dayOfTheWeekIndex = new Date(
    year,
    MONTHS.findIndex((m) => m.name == month),
    1
  ).getDay();
  return DAYS_OF_THE_WEEK[dayOfTheWeekIndex];
}

function generateDays(
  year: number,
  month: MonthName,
  entries: Entry[]
): (null | DayProps)[] {
  const blankDays: null[] = Array(
    DAYS_OF_THE_WEEK.indexOf(monthStartsOn(year, month))
  ).fill(null);

  const days: DayProps[] = [];

  for (let date = 1; date <= monthLength(year, month); date++) {
    const dateEntries = entries.filter(
      (e) =>
        e.month == MONTHS.find((m) => m.name == month)?.shortName &&
        e.date == date
    );

    const holidays = dateEntries
      .filter(
        (e) =>
          e.style != "birthday" && !MOON_PHASES.includes(e.name as MoonPhase)
      )
      .map((e) => ({
        name: e.name,
        bold: e.style == "bold",
      }));

    days.push({
      date,
      bold: !!dateEntries.find((e) => e.style == "bold"),
      birthday: dateEntries
        .filter((e) => e.style == "birthday")
        .map((e) => e.name)
        .join(", "),
      moonPhase: dateEntries.find((e) =>
        MOON_PHASES.includes(e.name as MoonPhase)
      )?.name as MoonPhase,
      holidays: holidays.sort((a, b) => (a.bold && !b.bold ? 1 : -1)),
    });
  }

  return [...blankDays, ...days];
}

function toWeeks(days: (null | DayProps)[]) {
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }
  return weeks;
  // return [
  //   days.splice(0, 7),
  //   days.splice(0, 7),
  //   days.splice(0, 7),
  //   days.splice(0, 7),
  //   days.splice(0, 7),
  //   days.splice(0, 7),
  // ];
}

function MonthCalendar({
  year,
  month,
  entries,
}: {
  year: number;
  month: MonthName;
  entries: Entry[];
}) {
  const weeks = toWeeks(generateDays(year, month, entries));

  return (
    <div className="w-180 h-120 border-x border-t even:border-b border-dashed p-2 flex flex-col gap-2">
      <div className="flex items-center">
        <div>{year}</div>
        <h2 className="grow text-center text-3xl font-bold">{month}</h2>
        <div>{year}</div>
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-y-[1.5px] text-xs">
            <th className="py-0.5">SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((days, weekIndex) => {
            const height =
              weeks.length == 6
                ? "h-[0.64in]"
                : weeks.length == 5
                ? "h-[0.768in]"
                : "h-[0.96in]";
            return (
              <Fragment key={weekIndex}>
                <tr className="h-0.5"></tr>
                <tr className={`${height} divide-x-[0.5px] align-top`}>
                  <Day day={days[0]} />
                  <Day day={days[1]} />
                  <Day day={days[2]} />
                  <Day day={days[3]} />
                  <Day day={days[4]} />
                  <Day day={days[5]} />
                  <Day day={days[6]} />
                </tr>
                <tr className="h-0.5 border-b"></tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Calendar({
  year,
  entries,
}: {
  year: number;
  entries: Entry[];
}) {
  return (
    <>
      {MONTHS.map((month) => (
        <MonthCalendar
          key={month.name}
          year={year}
          month={month.name}
          entries={entries}
        />
      ))}
    </>
  );
}
