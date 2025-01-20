import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async create(payload: any) {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  async update(id: number, payload: any) {
    return this.userRepository.update(id, payload);
  }

  async delete(id: number) {
    return this.userRepository.delete({ id });
  }
}
