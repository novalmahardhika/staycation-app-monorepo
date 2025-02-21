import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentSchemaDto } from './payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Payment } from 'src/database/entities/payment.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async create(payload: PaymentSchemaDto, manager?: EntityManager) {
    const session = await this.stripe.paymentIntents.create({
      amount: payload.amount,
      currency: payload.currency,
      payment_method_types: ['card'],
    });
    const payment = manager
      ? manager.create(Payment, {
          stripeId: session.id,
          currency: session.currency,
          amount: session.amount,
          status: session.status,
          booking: payload.bookingId,
        })
      : this.paymentRepository.create({
          stripeId: session.id,
          currency: session.currency,
          amount: session.amount,
          status: session.status,
          booking: payload.bookingId,
        });

    manager
      ? await manager.save(Payment, payment)
      : await this.paymentRepository.save(payment);

    return { clientSecret: session.client_secret };
  }
}
