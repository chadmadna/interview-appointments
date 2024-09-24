import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
