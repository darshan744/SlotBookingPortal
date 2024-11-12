export interface Slot {
  slotId: string
  startDate: string;
  endDate: string;
  slots: {
    venue: string;
    staffs: string[];
    slots: { time: string; limit: number }[];
  }[];
}
