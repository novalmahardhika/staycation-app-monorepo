import { User } from 'src/database/entities/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserSchema, UpdateUserSchema } from './user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findThrowById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async create(payload: CreateUserSchema, manager?: EntityManager) {
    const emailExist = await this.findByEmail(payload.email);

    if (emailExist) {
      throw new ConflictException('Email already exist');
    }

    const encryptedPassword = await hash(payload.password, 10);

    const user = this.userRepository.create({
      ...payload,
      password: encryptedPassword,
    });

    return manager ? manager.save(User, user) : this.userRepository.save(user);
  }

  async update(id: string, payload: UpdateUserSchema) {
    return this.userRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.userRepository.delete({ id });
  }
}
