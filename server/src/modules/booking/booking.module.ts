import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Booking } from 'src/database/entities/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { UserService } from '../user/user.service';
import { HomestayService } from '../homestay/homestay.service';
import { Homestay } from 'src/database/entities/homestay.entity';
import { Notification } from 'src/database/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, Homestay, Notification])],
  controllers: [BookingController],
  providers: [
    BookingService,
    UserService,
    HomestayService,
    NotificationService,
  ],
})
export class BookingModule {}
