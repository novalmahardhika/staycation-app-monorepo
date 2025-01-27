import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from 'src/database/entities/destination.entity';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { DetailDestination } from 'src/database/entities/detail-destination.entity';
import { DestinationLocation } from 'src/database/entities/destination-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Destination,
      DetailDestination,
      DestinationLocation,
    ]),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
