import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { Admin } from 'src/common/decorators/admin.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  @Admin()
  async getAll(@Res() res: Response) {
    const bookings = await this.bookingService.findAll();
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get all bookings success',
      data: bookings,
    });
  }

  @Post()
  async create(
    @Body() body: CreateBookingDto,
    @ReqUser() user: ReqUser,
    @Res() res: Response,
  ) {
    const { id: userId } = user;
    await this.bookingService.create(body, userId);
    return res.status(HttpStatus.CREATED).json({
      status: 'CREATED',
      message: 'Create booking success',
    });
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateBookingDto,
    @Param('id') id: string,
    @ReqUser() user: ReqUser,
    @Res() res: Response,
  ) {
    const { id: userId } = user;
    await this.bookingService.update(id, body, userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Update booking success',
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @ReqUser() user: ReqUser,
    @Res() res: Response,
  ) {
    const { id: userId } = user;
    await this.bookingService.delete(id, userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Delete booking success',
    });
  }

  @Get('me')
  async getMe(@ReqUser() user: ReqUser, @Res() res: Response) {
    const { id: userId } = user;
    const bookings = await this.bookingService.findManyByUserId(userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get all bookings success',
      data: bookings,
    });
  }
}
