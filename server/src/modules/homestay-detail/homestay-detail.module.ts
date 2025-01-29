import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomestayDetail } from 'src/database/entities/homestay-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomestayDetail])],
  controllers: [],
  providers: [],
})
export class HomeStayDetailModule {}
