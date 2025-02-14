import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {}
