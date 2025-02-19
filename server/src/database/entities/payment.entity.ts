import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export const STATUS_PAYMENT = [
  'requires_payment_method',
  'requires_action',
  'amount_capturable_updated',
  'succeeded',
  'processing',
  'payment_failed',
  'canceled',
] as const;

export type StatusPayment = (typeof STATUS_PAYMENT)[number];

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @Column({ type: 'varchar' })
  stripeId!: string;

  @Column({ type: 'int' })
  number!: number;

  @Column({ type: 'varchar' })
  currency!: string;

  @Column({ type: 'enum', enum: STATUS_PAYMENT })
  status!: StatusPayment;
}
