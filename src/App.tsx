import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import type { Entry, EntryStyle, MonthShortName } from "./types";

const data = `Jan 1,New Year's Day,bold
Jan 1,Mom,birthday
Jan 3,Full Moon
Jan 4,Epiphany
Jan 10,Last Quarter Moon
Jan 18,New Moon
Jan 18,Dad,birthday
Jan 19,MLK Jr. Day,bold
Jan 25,First Quarter Moon
Feb 1,Full Moon
Feb 2,Groundhog Day
Feb 9,Last Quarter Moon
Feb 12,Lincoln's Birthday
Feb 14,Valentine's Day
Feb 16,Washington's Birthday,bold
Feb 17,Shrove Tuesday
Feb 17,New Moon
Feb 18,Ash Wednesday
Feb 24,First Quarter Moon
Mar 3,Full Moon
Mar 8,Daylight Saving Time begins
Mar 11,Last Quarter Moon
Mar 17,St. Patrick's Day
Mar 18,New Moon
Mar 25,First Quarter Moon
Mar 29,Palm Sunday
Apr 1,April Fool's Day
Apr 1,Full Moon
Apr 2,Maundy Thursday
Apr 3,Good Friday
Apr 4,Holy Saturday
Apr 5,Easter Sunday
Apr 9,Last Quarter Moon
Apr 15,Tax Day
Apr 17,New Moon
Apr 22,Earth Day
Apr 23,First Quarter Moon
Apr 24,Arbor Day
May 1,May Day
May 1,Full Moon
May 5,Cinco de Mayo
May 9,Last Quarter Moon
May 10,Mother's Day
May 16,New Moon
May 19,Malcom X Day
May 14,Ascension Day
May 23,First Quarter Moon
May 24,Pentecost
May 25,Memorial Day,bold
May 31,Trinity Sunday
May 31,Full Moon
Jun 7,Corpus Christi
Jun 8,Last Quarter Moon
Jun 14,Flag Day
Jun 14,New Moon
Jun 19,Juneteenth,bold
Jun 21,Father's Day
Jun 21,First Quarter Moon
Jun 29,Full Moon
Jul 3,Independence Day (Observed),bold
Jul 4,Independence Day
Jul 7,Last Quarter Moon
Jul 14,New Moon
Jul 21,First Quarter Moon
Jul 29,Full Moon
Aug 5,Last Quarter Moon
Aug 12,New Moon
Aug 19,First Quarter Moon
Aug 27,Full Moon
Sep 4,Last Quarter Moon
Sep 7,Labor Day,bold
Sep 10,New Moon
Sep 18,First Quarter Moon
Sep 26,Full Moon
Oct 3,Last Quarter Moon
Oct 10,New Moon
Oct 12,Indigenous People's Day,bold
Oct 18,First Quarter Moon
Oct 25,Full Moon
Oct 31,Halloween
Nov 1,All Saints' Day
Nov 1,Daylight Saving Time ends
Nov 1,Last Quarter Moon
Nov 2,All Souls' Day
Nov 3,Election Day
Nov 9,New Moon
Nov 11,Veterans Day,bold
Nov 17,First Quarter Moon
Nov 24,Full Moon
Nov 26,Thanksgiving Day,bold
Nov 29,Advent begins
Dec 1,Last Quarter Moon
Dec 8,New Moon
Dec 16,First Quarter Moon
Dec 23,Full Moon
Dec 24,Christmas Eve
Dec 25,Christmas Day,bold
Dec 30,Last Quarter Moon
Dec 31,New Year's Eve`;

function parseEntries(input: string): Entry[] {
  return input.split("\n").map((line) => {
    const [date, name, style] = line.split(",");
    const [month, day] = date.split(" ");

    return {
      month: month as unknown as MonthShortName,
      date: parseInt(day, 10),
      name,
      style: style as EntryStyle,
    };
  });
}

function App() {
  const [input, setInput] = useState(data);
  const [year, setYear] = useState("2026");

  return (
    <div className="flex">
      <div className="flex flex-col gap-1 print:hidden h-screen sticky top-0 p-2">
        <label className="flex gap-2">
          Year:
          <input
            className="border px-1 w-12"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            onClick={() => print()}
            className="ml-2 border border-neutral-500 px-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-100"
          >
            Print
          </button>
        </label>
        <label className="flex flex-col h-full">
          <span>
            Your Holidays: <small>(note: defaults below are for 2026)</small>
          </span>
          <textarea
            cols={40}
            rows={2}
            className="h-full border p-1"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          ></textarea>
        </label>
      </div>
      <div>
        <Calendar
          year={parseInt(year, 10) || 2026}
          entries={parseEntries(input)}
        />
      </div>
    </div>
  );
}

export default App;
