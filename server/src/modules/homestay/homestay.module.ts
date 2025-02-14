import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homestay } from 'src/database/entities/homestay.entity';
import { HomestayController } from './homestay.controller';
import { HomestayService } from './homestay.service';
import { Booking } from 'src/database/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homestay, Booking])],
  controllers: [HomestayController],
  providers: [HomestayService],
})
export class HomestayModule {}
