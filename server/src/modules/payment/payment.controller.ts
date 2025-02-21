import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSchemaDto } from './payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async create(@Body() body: PaymentSchemaDto) {
    return await this.paymentService.create(body);
  }
}
