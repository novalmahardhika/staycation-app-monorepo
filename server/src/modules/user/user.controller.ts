import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.userService.create(body);
  }
}
