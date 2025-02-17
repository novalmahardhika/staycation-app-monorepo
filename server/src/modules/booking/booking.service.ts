import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/database/entities/booking.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { HomestayService } from '../homestay/homestay.service';
import { CreateBookingSchema, UpdateBookingSchema } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private userService: UserService,
    private homestayService: HomestayService,
  ) {}

  async findAll() {
    return await this.bookingRepository.find();
  }

  async findById(id: string) {
    return await this.bookingRepository.findOneBy({ id });
  }

  async findThrowById(id: string) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async create(payload: CreateBookingSchema) {
    const { bookedById, homestayId } = payload;
    const bookedBy = await this.userService.findThrowById(bookedById);
    const homestay = await this.homestayService.findThrowById(homestayId);

    const booking = this.bookingRepository.create({
      ...payload,
      homestay,
      bookedBy,
    });

    return this.bookingRepository.save(booking);
  }

  async update(id: string, payload: UpdateBookingSchema) {
    const booking = await this.findThrowById(id);
    await this.bookingRepository.update(id, payload);
    return booking;
  }

  async delete(id: string) {
    const booking = await this.findThrowById(id);
    await this.bookingRepository.delete({ id });
    return booking;
  }
}
