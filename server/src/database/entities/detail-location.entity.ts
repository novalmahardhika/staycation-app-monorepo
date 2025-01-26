import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'detail_locations' })
export class DetailLocation extends BaseEntity {
  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ name: 'zip_code', type: 'varchar' })
  zipCode!: string;
}
