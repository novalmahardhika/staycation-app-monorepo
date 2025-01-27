import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

export const roleList = ['USER', 'ADMIN'] as const;
export type Role = (typeof roleList)[number];

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string | null;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string | null;

  @Column({ enum: roleList, default: roleList[0], nullable: true })
  role?: Role;

  @Column({ type: 'varchar', nullable: true })
  phone?: string | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;
}
