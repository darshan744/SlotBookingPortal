export interface Slot {
  startDate: string;
  endDate: string;
  slots: {
    venue: string;
    staffs: string[];
    slots: { time: string; limit: number }[];
  }[];
}