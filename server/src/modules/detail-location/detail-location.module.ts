import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailLocation } from 'src/database/entities/detail-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailLocation])],
  controllers: [],
  providers: [],
})
export class UserModule {}
