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
    return await this.homestayRepository.findOneBy({
      id,
    });
  }

  async findThrowById(id: string) {
    const homestay = await this.homestayRepository.findOne({
      where: { id },
    });
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }
    return homestay;
  }

  async create(payload: any) {
    const homestay = this.homestayRepository.create(payload);
    return this.homestayRepository.save(homestay);
  }

  async update(id: string, payload: any) {
    return this.homestayRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.homestayRepository.delete({ id });
  }
}
