import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DetailDestination } from './detail-destination.entity';
import { DestinationLocation } from './destination-location.entity';

@Entity({ name: 'destinations' })
export class Destination extends BaseEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  image!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  discount?: number | 0;

  @Column({ type: 'boolean', nullable: true, default: false })
  isPopular?: boolean | false;

  @ManyToOne(() => DestinationLocation, (location) => location.destination, {
    nullable: true,
  })
  address?: DestinationLocation;

  @OneToOne(() => DetailDestination, { cascade: true })
  @JoinColumn()
  detail!: DetailDestination;
}
