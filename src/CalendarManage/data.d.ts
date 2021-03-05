export interface calendarChildListType {
  weekNumber: number;
  weekName: string;
  dateObj: Date;
}

export interface calendarListType {
  key: string;
  children: calendarChildListType[];
}
