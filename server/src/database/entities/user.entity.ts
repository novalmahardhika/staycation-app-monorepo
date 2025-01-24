import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;
}
