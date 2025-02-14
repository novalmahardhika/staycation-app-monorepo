import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'boolean', default: false })
  isRead?: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;
}
