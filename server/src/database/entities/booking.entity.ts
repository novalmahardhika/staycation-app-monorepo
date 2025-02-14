import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Homestay } from './homestay.entity';
import { User } from './user.entity';

export const statusBooking = [
  'NEW',
  'PROGRESS',
  'PENDING',
  'FINISH',
  'EXPIRED',
  'CANCEL',
];

export type StatusBooking = (typeof statusBooking)[number];

export type DetailBooking = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
  @Column({ type: 'enum', enum: statusBooking, default: 'NEW' })
  status!: StatusBooking;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ name: 'total_price', type: 'int' })
  totalPrice!: number;

  @Column({ name: 'total_duration', type: 'varchar' })
  totalDuration!: string;

  @Column({ type: 'jsonb', nullable: true })
  detail?: DetailBooking | null;

  @ManyToOne(() => User, (user) => user.bookings)
  bookedBy!: User;

  @ManyToOne(() => Homestay, (homestay) => homestay.bookings)
  homestay!: Homestay;
}
