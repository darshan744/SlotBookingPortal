export type i = {
  instructorId: string;
  responseDeadline: string,
  forYear : string,
  eventType : string,
  availableSlots: {
      date: string;
      slots: {
          time: any;
          isAvailable: string
      }[]
  }[]
}
type staff = {
  id: string,
  name: string
}
export type groupDates = { date: string; slots: string[] }
export const assignToStaff = (staffs: staff[], slots: groupDates[], responseDeadline: Date , forYear : string , eventType : string): i[] => {
  const availabilityStaffArray: i[] = [];
  // let availabilityStaffArray = new Array<i>()
  staffs.forEach((staff) => {
      availabilityStaffArray.push({
          instructorId: staff.id,
          forYear ,
          eventType ,
          availableSlots: slots.map(slot => ({
              date: slot.date,
              slots: slot.slots.map((eachSlot: string) => ({
                  time: eachSlot,
                  isAvailable: 'unmodified',
              }))
          })),
          responseDeadline : responseDeadline.toISOString()
      })
  });
  console.log('assignToStaff');
  console.log(availabilityStaffArray);
  return availabilityStaffArray;
}

/**
 * @returns
 * An Array of Strings Displaying Hour Range in a single String
 * @example
 * [09:00 - 10:00 , 10:00 - 11:00 , 11:00 - 12:00]
 *
 */
export const generateHoursForStaffs = (): string[] => {
  const resultSlots: string[] = [];
  const minutesToTime = (minutes: number): string => {
      const hours: number = Math.floor(minutes / 60);
      const min: number = Math.floor(minutes % 60);
      return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
  }
  const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
  }
  let startTime: string = '8:45', endTime: string = '16:30';
  let startMinutes: number = timeToMinutes(startTime), endMinutes: number = timeToMinutes(endTime);
  const hour: number = 60;
  while (startMinutes <= endMinutes) {
      let timeInterval: string = `${minutesToTime(startMinutes)} - ${minutesToTime(startMinutes + hour)}`;
      if (timeInterval !== '12:45 - 13:45')
          if (timeInterval === '15:45 - 16:45')
              resultSlots.push('15:45 - 16:30');
          else
              resultSlots.push(timeInterval);

      startMinutes += hour;
  }
  return resultSlots;
}
export const assignSlotsToDate = (startDateStr: string, endDateStr: string, slots: string[]): groupDates[] => {
  const resultSlot: { date: string; slots: string[] }[] = [];
  let startDate: Date = new Date(startDateStr);
  let endDate: Date = new Date(endDateStr);
  // Set the hours to 20 (8 PM) to handle the timezone offset when sending the date to the backend.
  startDate.setHours(20);
  endDate.setHours(20);
  // console.log('startDate' , startDate , 'endDate',endDate);
  while (startDate <= endDate) {
      if (startDate.getDay() !== 0) {
          let date = new Date(startDate).toISOString();
          const element = { date, slots: slots };
          resultSlot.push(element);
      }
      startDate.setDate(startDate.getDate() + 1);
  }

  return resultSlot;
}
