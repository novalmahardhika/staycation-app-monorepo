import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailDestination } from 'src/database/entities/detail-destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailDestination])],
  controllers: [],
  providers: [],
})
export class UserModule {}
