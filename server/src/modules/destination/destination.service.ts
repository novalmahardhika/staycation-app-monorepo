import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from 'src/database/entities/destination.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async findAll() {
    return await this.destinationRepository.find({
      relations: { address: true },
    });
  }

  async findById(id: string) {
    const user = await this.destinationRepository.findOne({
      where: { id },
      relations: { address: true, detail: true },
    });
    return user;
  }

  async create(payload: any) {
    const user = this.destinationRepository.create(payload);
    return this.destinationRepository.save(user);
  }

  async update(id: string, payload: any) {
    return this.destinationRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.destinationRepository.delete({ id });
  }
}
