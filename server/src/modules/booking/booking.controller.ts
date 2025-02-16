import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { UserService } from '../user/user.service';
import { HomestayService } from '../homestay/homestay.service';

@Controller('bookings')
export class BookingController {
  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private homestayService: HomestayService,
  ) {}

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
    const bookedBy = await this.userService.findById(body.bookedById);

    if (!bookedBy) {
      throw new NotFoundException('Booked by id not found');
    }
    const homestay = await this.homestayService.findById(body.homestayId);
    if (!homestay) {
      throw new NotFoundException('Homestay id not found');
    }
    await this.bookingService.create({
      ...body,
      bookedBy,
      homestay,
    });

    return res.status(HttpStatus.CREATED).json({
      status: 'CREATED',
      message: 'Create booking success',
    });
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateBookingDto,
    @Param() params: { id: string },
    @Res() res: Response,
  ) {
    const booking = this.bookingService.findById(params.id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    await this.bookingService.update(params.id, body);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Update booking success',
    });
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }, @Res() res: Response) {
    await this.bookingService.delete(params.id);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Delete booking success',
    });
  }
}
