import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { User } from 'src/database/entities/user.entity';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const bookings = await this.bookingService.findAll();
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get all bookings success',
      data: bookings,
    });
  }

  @Post()
  async create(@Body() body: CreateBookingDto, @Res() res: Response) {
    await this.bookingService.create(body);
    return res.status(HttpStatus.CREATED).json({
      status: 'CREATED',
      message: 'Create booking success',
    });
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateBookingDto,
    @Param('id') id: string,
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const { id: userId } = req.user;
    console.log(userId);
    await this.bookingService.update(id, body, userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Update booking success',
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const { id: userId } = req.user;
    await this.bookingService.delete(id, userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Delete booking success',
    });
  }
}
