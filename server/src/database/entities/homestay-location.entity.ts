import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Homestay } from './homestay.entity';

@Entity({ name: 'homestay_locations' })
export class HomestayLocation extends BaseEntity {
  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ name: 'zip_code', type: 'varchar' })
  zipCode!: string;

  @OneToMany(() => Homestay, (homestay) => homestay.address)
  destination: Homestay[];
}
