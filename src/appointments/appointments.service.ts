import * as moment from 'moment';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentReqDto } from './dto/create-appointment.req.dto';
import { SuccessResDto } from './dto/success.res.dto';
import { ViewAppointmentsListResDto } from './dto/view-appointments-list.res.dto';
import { appConfig } from '../app.config';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async create(createAppointmentDto: CreateAppointmentReqDto) {
    if (createAppointmentDto.date.length < 1) {
      throw new HttpException(
        'Date required, please follow YYYY-MM-DD',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createAppointmentDto.time.length < 1) {
      throw new HttpException(
        'Time required, please follow HH:MM',
        HttpStatus.BAD_REQUEST,
      );
    }

    const datetime = this.validateDatetime(
      createAppointmentDto.date,
      createAppointmentDto.time,
    );

    try {
      this.checkTimeSlot(+datetime, createAppointmentDto.slots);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    const result = await this.appointmentModel.create({
      title: createAppointmentDto.title,
      time: +datetime,
      duration: moment
        .duration(createAppointmentDto.slots * appConfig.slotLength, 'minutes')
        .asMinutes(),
      slots: createAppointmentDto.slots,
    });

    return <SuccessResDto>{
      message: `Created appointment '${result.title}' on ${datetime.tz(appConfig.defaultTimezone).format('LLL')}`,
    };
  }

  async findAll() {
    const results = await this.appointmentModel.findAll();
    return new ViewAppointmentsListResDto(results);
  }

  cancel(id: number) {
    return this.appointmentModel.destroy({
      where: {
        id: id,
      },
    });
  }

  private validateDatetime(date: string, time: string) {
    const datetime = moment(`${date} ${time}`);

    if (!datetime.isValid()) {
      throw new HttpException(
        'Invalid date and time, please check again',
        HttpStatus.BAD_REQUEST,
      );
    }

    return datetime;
  }

  private async checkTimeSlot(time: number, slots: number) {
    let currentTime = time;
    const endTime =
      time +
      moment.duration(appConfig.slotLength, 'minutes').asMilliseconds() * slots;

    while (currentTime < endTime) {
      const nextAppointment = await this.appointmentModel.findOne({
        order: [['time', 'ASC']],
        where: {
          date: {
            gte: currentTime,
          },
        },
      });

      if (!nextAppointment) {
        currentTime += moment
          .duration(appConfig.slotLength, 'minutes')
          .asMilliseconds();
      } else {
        throw new Error(
          `This time is already booked. Please cancel appointment '${nextAppointment.title}' or find another time`,
        );
      }
    }
  }
}
