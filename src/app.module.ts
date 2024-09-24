import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { sqliteConfig } from './db/sqlite.config';

@Module({
  imports: [AppointmentsModule, SequelizeModule.forRoot(sqliteConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
