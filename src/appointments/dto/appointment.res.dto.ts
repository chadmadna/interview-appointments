import * as moment from 'moment-timezone';
import { Appointment } from '../entities/appointment.entity';
import { appConfig } from '../../app.config';

export class AppointmentResDto {
  private appointment: Appointment;

  constructor(entity: Appointment) {
    this.appointment = entity;
  }

  toString() {
    return `'${this.appointment.title}' on ${moment(this.appointment.time).tz(appConfig.defaultTimezone).format('LLL')}`;
  }

  toObj() {
    const datetime = moment(this.appointment.time);
    return {
      id: this.appointment.id,
      date: datetime.format('YYYY-MM-DD'),
      time: datetime.format('HH:mm'),
      availableSlots: this.appointment.slotLength,
    };
  }
}
