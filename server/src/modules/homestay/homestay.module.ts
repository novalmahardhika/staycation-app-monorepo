import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homestay } from 'src/database/entities/homestay.entity';
import { HomestayController } from './homestay.controller';
import { HomestayService } from './homestay.service';
import { HomestayDetail } from 'src/database/entities/homestay-detail.entity';
import { HomestayLocation } from 'src/database/entities/homestay-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Homestay, HomestayDetail, HomestayLocation]),
  ],
  controllers: [HomestayController],
  providers: [HomestayService],
})
export class HomestayModule {}
