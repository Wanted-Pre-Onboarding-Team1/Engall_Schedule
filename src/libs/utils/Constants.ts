import { getIntervalArray } from 'pages/addSchedulePage/utils';
import { Schedule } from 'types/customTypes';

export const DAY_OF_WEEK = [
  { id: 1, item: 'Monday' },
  { id: 2, item: 'Tuesday' },
  { id: 3, item: 'Wednesday' },
  { id: 4, item: 'Thursday' },
  { id: 5, item: 'Friday' },
  { id: 6, item: 'Saturday' },
  { id: 7, item: 'Sunday' },
];

export const AM_PM = [
  { id: 1, item: 'AM', status: true },
  { id: 2, item: 'PM', status: false },
];

export const CLASS_DURATION = 40;

export const INITIAL_SELECTED_TIME: Schedule = {
  startTime: { hour: '00', minute: '00', isAM: true },
  endTime: { hour: '00', minute: '00', isAM: true },
};

export const HOUR_LIST = getIntervalArray(12, 1, false).map((value: number) =>
  String(value).padStart(2, '0'),
);
export const MINUTE_LIST = getIntervalArray(12, 5, true).map((value: number) =>
  String(value).padStart(2, '0'),
);
