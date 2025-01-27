import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Destination } from './destination.entity';

@Entity({ name: 'destination_locations' })
export class DestinationLocation extends BaseEntity {
  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ name: 'zip_code', type: 'varchar' })
  zipCode!: string;

  @OneToMany(() => Destination, (destination) => destination.address)
  destination: Destination[];
}
