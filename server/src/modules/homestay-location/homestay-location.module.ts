import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomestayLocation } from 'src/database/entities/homestay-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomestayLocation])],
  controllers: [],
  providers: [],
})
export class HomeStayLocationModule {}
