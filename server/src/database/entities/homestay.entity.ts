import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { HomestayLocation } from './homestay-location.entity';
import { HomestayDetail } from './homestay-detail.entity';

@Entity({ name: 'homestays' })
export class Homestay extends BaseEntity {
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

  @ManyToOne(() => HomestayLocation, (location) => location.destination, {
    nullable: true,
  })
  address?: HomestayLocation;

  @OneToOne(() => HomestayDetail, { cascade: true })
  @JoinColumn()
  detail!: HomestayDetail;
}
