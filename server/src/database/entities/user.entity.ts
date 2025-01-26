import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export const roleList = ['USER', 'ADMIN'] as const;

export type Role = (typeof roleList)[number];

@Entity({ name: 'Users' })
export class User extends BaseEntity {
  @Column({ name: 'first_name', length: 30 })
  firstName!: string;

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ enum: roleList, default: roleList[0], nullable: true })
  role?: Role;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;
}
