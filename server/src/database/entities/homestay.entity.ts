import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

export type Facility = {
  type: string;
  label: string;
  qty: number;
};

@Entity({ name: 'homestays' })
export class Homestay extends BaseEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'simple-array' })
  images!: string[];

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  discount?: number | 0;

  @Column({ type: 'boolean', nullable: true, default: false })
  isPopular?: boolean | false;

  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ type: 'jsonb' })
  facilities!: Facility[];

  @OneToMany(() => Booking, (booking) => booking.homestay)
  bookings?: Booking[];
}
