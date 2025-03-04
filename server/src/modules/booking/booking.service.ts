import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/database/entities/booking.entity';
import { EntityManager, Equal, Not, Repository } from 'typeorm';
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
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['payment', 'homestay'],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async create(payload: CreateBookingSchema, manager?: EntityManager) {
    const booking = manager
      ? manager.create(Booking, payload)
      : this.bookingRepository.create(payload);

    return manager
      ? await manager.save(booking)
      : await this.bookingRepository.save(booking);
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

  async checkAlreadyBooking(userId: string, homestayId: string) {
    const booking = await this.bookingRepository.existsBy({
      bookedBy: {
        id: userId,
      },
      homestay: {
        id: homestayId,
      },
      status: Not(Equal('FINISH')),
    });
    if (booking) {
      throw new ConflictException('Already booking this homestay');
    }
    return booking;
  }

  async createTransaction(payload: CreateBookingSchema, userId: string) {
    const { bookedById, homestayId } = payload;
    const bookedBy = await this.userService.findThrowById(bookedById);
    const homestay = await this.homestayService.findThrowById(homestayId);
    await this.checkAlreadyBooking(bookedBy.id, homestay.id);

    const data = await this.entity.transaction(
      async (manager: EntityManager) => {
        const payloadBook = {
          ...payload,
          bookedBy: bookedBy.id,
          homestay: homestay.id,
          detail: {
            firstName: bookedBy.firstName,
            lastName: bookedBy.lastName,
            email: bookedBy.email,
            phone: bookedBy.phone,
          },
        };
        const booking = await this.create(payloadBook, manager);

        const payloadNotify = {
          title: 'Booking',
          description: `Booking ${homestay.name}`,
          userId: userId,
        };
        await this.notificationService.create(payloadNotify, manager);

        return booking;
      },
    );
    return data;
  }
}
