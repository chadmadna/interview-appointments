import { AppointmentResDto } from './appointment.res.dto';

export class ViewAppointmentsListResDto {
  private appointments = [];

  constructor(appointments) {
    appointments.forEach((appointment) => {
      const appt = new AppointmentResDto(appointment);
      this.appointments.push(appt.toObj());
    });
  }
}
