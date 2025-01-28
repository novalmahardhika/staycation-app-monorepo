import { Controller, Get, Param } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('destinations')
export class DestinationController {
  constructor(private destination: DestinationService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.destination.findAll();
  }

  @Public()
  @Get('/:id')
  async getById(@Param() params: { id: string }) {
    return await this.destination.findById(params.id);
  }
}
