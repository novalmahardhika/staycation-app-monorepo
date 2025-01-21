import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: string) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async create(payload: any) {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  async update(id: string, payload: any) {
    return this.userRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.userRepository.delete({ id });
  }
}
