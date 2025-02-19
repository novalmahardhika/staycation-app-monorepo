import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/database/entities/booking.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { HomestayService } from '../homestay/homestay.service';
import { CreateBookingSchema, UpdateBookingSchema } from './booking.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectEntityManager()
    private entity: EntityManager,
    private userService: UserService,
    private homestayService: HomestayService,
    private notificationService: NotificationService,
  ) {}

  async findAll() {
    return await this.bookingRepository.find();
  }

  async findById(id: string) {
    return await this.bookingRepository.findOneBy({ id });
  }

  async findManyByUserId(userId: string) {
    return await this.bookingRepository.findBy({
      bookedBy: {
        id: userId,
      },
    });
  }

  async findThrowById(id: string) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async create(payload: CreateBookingSchema, userId: string) {
    const { bookedById, homestayId } = payload;
    if (bookedById !== userId) {
      throw new BadRequestException(
        'User cannot create booking with this bookedById ',
      );
    }

    const bookedBy = await this.userService.findThrowById(bookedById);
    const homestay = await this.homestayService.findThrowById(homestayId);

    await this.entity.transaction(async (manager: EntityManager) => {
      const booking = this.bookingRepository.create({
        ...payload,
        homestay,
        bookedBy,
      });
      await manager.save(Booking, booking);

      await this.notificationService.create(
        {
          title: 'Booking',
          description: `Booking ${homestay.name}`,
          userId: userId,
        },
        manager,
      );
      return booking;
    });
  }

  async update(id: string, payload: UpdateBookingSchema, userId: string) {
    const booking = await this.findThrowById(id);
    await this.accessBooking(userId, booking.id);
    return await this.bookingRepository.update(id, payload);
  }

  async delete(id: string, userId: string) {
    const booking = await this.findThrowById(id);
    await this.accessBooking(userId, booking.id);
    return await this.bookingRepository.delete({ id });
  }

  async accessBooking(userId: string, bookingId: string) {
    const access = await this.bookingRepository.exists({
      where: {
        id: bookingId,
        bookedBy: {
          id: userId,
        },
      },
    });
    if (!access) {
      throw new ForbiddenException('User booking access denied');
    }
    return access;
  }
}
