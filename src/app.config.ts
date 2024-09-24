export const appConfig = {
  defaultTimezone: process.env.DEFAULT_TIMEZONE || 'Asia/Jakarta',
  slotLength: +process.env.APPOINTMENTS_SLOT_LENGTH || 30, // in minutes
  forbidWeekends: process.env.APPOINTMENTS_FORBID_WEEKENDS === 'true',
  forbidPublicHolidays:
    process.env.APPOINTMENTS_FORBID_PUBLIC_HOLIDAYS === 'true',
  forbidLunchBreaks: process.env.APPOINTMENTS_FORBID_LUNCH_BREAKS === 'true',
};
