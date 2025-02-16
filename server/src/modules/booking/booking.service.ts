import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/database/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll() {
    return await this.bookingRepository.find();
  }

  async findById(id: string) {
    return await this.bookingRepository.findOneBy({ id });
  }

  async create(payload: any) {
    const booking = this.bookingRepository.create(payload);
    return this.bookingRepository.save(booking);
  }

  async update(id: string, payload: any) {
    return this.bookingRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.bookingRepository.delete({ id });
  }
}
