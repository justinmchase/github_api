type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `19${ZeroToNine}${ZeroToNine}` | `20${ZeroToNine}${ZeroToNine}`;
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`;
type DD = `0${OneToNine}` | `1${ZeroToNine}` | `2${ZeroToNine}` | `3${0 | 1}`;
type hh = `0${ZeroToNine}` | `1${ZeroToNine}` | `2${0 | 1 | 2 | 3}`;
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${ZeroToNine}`;
type ss = `${0 | 1 | 2 | 3 | 4 | 5}${ZeroToNine}`;
export type DateString = `${YYYY}-${MM}-${DD}`;
export type TimeString = `${hh}:${mm}:${ss}`;
export type UtcOffsetString = `${hh}:${mm}`;

// Typescript can't handle the full datetime string
// so we use an object to represent it.
export type DateTimeString = string; // `${DateString}T${TimeString}${"Z" | `+${UtcOffsetString}}`
export type GitHubDate =
  | { date: DateString }
  | { date: DateString; time: TimeString }
  | { date: DateString; time: TimeString; offset: UtcOffsetString };

export function githubFormatDate(date: GitHubDate) {
  const d = date as Record<string, string>;
  if (d.time && d.offset) {
    return `${d.date}T${d.time}+${d.offset}`;
  } else if (d.time) {
    return `${d.date}T${d.time}Z`;
  } else {
    return d.date;
  }
}
