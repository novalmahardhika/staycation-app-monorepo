import { BaseEntity } from './base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Destination } from './destination.entity';

@Entity({ name: 'detail_destinations' })
export class DetailDestination extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  owner?: string | null;

  @Column({ type: 'simple-array' })
  images!: string[];

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  bedroom?: number | 0;

  @Column({ name: 'living_room', type: 'int', nullable: true, default: 0 })
  livingRoom?: number | 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  bathroom?: number | 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  kitchen?: number | 0;

  @Column({ name: 'air_conditioner', type: 'int', nullable: true, default: 0 })
  airConditioner?: number | 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  refrigerator?: number | 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  television?: number | 0;

  @Column({ type: 'int', nullable: true, default: 0 })
  wifi?: number | 0;

  @Column({ name: 'swimming_pool', type: 'int', nullable: true, default: 0 })
  swimmingPool?: number;

  @OneToOne(() => Destination, (destination) => destination.detail)
  destination: Destination;
}
