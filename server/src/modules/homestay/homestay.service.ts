import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Homestay } from 'src/database/entities/homestay.entity';

@Injectable()
export class HomestayService {
  constructor(
    @InjectRepository(Homestay)
    private homestayRepository: Repository<Homestay>,
  ) {}

  async findAll() {
    return await this.homestayRepository.find({
      select: ['id', 'name', 'price', 'isPopular', 'images', 'city', 'country'],
      relations: ['category'],
    });
  }

  async findById(id: string) {
    const user = await this.homestayRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(payload: any) {
    const user = this.homestayRepository.create(payload);
    return this.homestayRepository.save(user);
  }

  async update(id: string, payload: any) {
    return this.homestayRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.homestayRepository.delete({ id });
  }
}
