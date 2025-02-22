import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentSchemaDto } from './payment.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Payment } from 'src/database/entities/payment.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectEntityManager()
    private entity: EntityManager,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async create(payload: PaymentSchemaDto) {
    const session = await this.entity.transaction(
      async (manager: EntityManager) => {
        const stripe = await this.stripe.paymentIntents.create({
          amount: payload.amount,
          currency: payload.currency,
          automatic_payment_methods: {
            enabled: true,
          },
        });

        const payment = manager.create(Payment, {
          stripeId: stripe.id,
          currency: stripe.currency,
          amount: stripe.amount,
          status: stripe.status,
          booking: payload.bookingId,
        });
        await manager.save(Payment, payment);

        return stripe;
      },
    );

    return { clientSecret: session.client_secret };
  }
}
