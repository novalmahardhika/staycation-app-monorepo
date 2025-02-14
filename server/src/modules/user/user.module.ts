import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Booking } from 'src/database/entities/booking.entity';
import { Notification } from 'src/database/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, Notification])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
