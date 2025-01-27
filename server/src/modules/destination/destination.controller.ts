import { Controller, Get, Param } from '@nestjs/common';
import { DestinationService } from './destination.service';

@Controller('destinations')
export class DestinationController {
  constructor(private destination: DestinationService) {}

  @Get()
  async getAll() {
    return await this.destination.findAll();
  }

  @Get('/:id')
  async getById(@Param() params: { id: string }) {
    return await this.destination.findById(params.id);
  }
}
