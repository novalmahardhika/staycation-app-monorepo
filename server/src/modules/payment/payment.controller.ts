import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSchemaDto } from './payment.dto';
import { Response } from 'express';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async create(@Body() body: PaymentSchemaDto, @Res() res: Response) {
    const clientSecret = await this.paymentService.create(body);

    return res.status(HttpStatus.CREATED).json({
      status: 'OK',
      message: 'Get homestay detail success',
      data: clientSecret,
    });
  }
}
