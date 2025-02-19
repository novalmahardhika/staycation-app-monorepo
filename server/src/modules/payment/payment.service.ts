import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async create() {
    const session = await this.stripe.paymentIntents.create({
      amount: 200,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return session;
  }
}
