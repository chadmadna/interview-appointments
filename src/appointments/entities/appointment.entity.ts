import { Column, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'appointments' })
export class Appointment extends Model {
  @Column
  title: string;

  @Column
  time: number; // in epoch secs

  @Column
  duration: number; // in minutes

  @Column
  slotLength: number; // number of slots booked
}
