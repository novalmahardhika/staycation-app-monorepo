import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Homestay } from './homestay.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @OneToMany(() => Homestay, (homestay) => homestay.category)
  homestays!: string | Homestay[];
}
