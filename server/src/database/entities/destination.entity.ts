import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

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
}
