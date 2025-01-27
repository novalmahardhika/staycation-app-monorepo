import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationLocation } from 'src/database/entities/destination-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationLocation])],
  controllers: [],
  providers: [],
})
export class UserModule {}
