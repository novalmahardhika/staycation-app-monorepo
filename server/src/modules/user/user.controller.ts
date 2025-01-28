import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get(':id')
  async getById(@Param() params: { id: string }) {
    return await this.userService.findById(params.id);
  }

  @Patch(':id')
  async update(@Body() body: UpdateUserDto, @Param() params: { id: string }) {
    return this.userService.update(params.id, body);
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    return this.userService.delete(params.id);
  }
}
