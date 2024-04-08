
export interface DayOfWeekType {
    day:string,
    abbr:string,
    index:number
}

export const daysOfTheWeek:DayOfWeekType[] = [
  {
    day: 'sunday',
    abbr: 'Su',
    index: 0
  },
  {
    day: 'monday',
    abbr: 'M',
    index: 1
  },
  {
    day: 'tuesday',
    abbr: 'T',
    index: 2
  },
  {
    day: 'wednesday',
    abbr: 'W',
    index: 3
  },
  {
    day: 'thursday',
    abbr: 'Th',
    index: 4
  },
  {
    day: 'friday',
    abbr: 'F',
    index: 5
  },
  {
    day: 'saturday',
    abbr: 'Sa',
    index: 6
  }
];

export default daysOfTheWeek;

export type DayOfWeekType = DayOfWeekType;