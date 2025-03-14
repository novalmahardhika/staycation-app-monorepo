import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Response } from 'express';
import { Admin } from 'src/common/decorators/admin.decorator';
import { ReqUser } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Admin()
  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get all users success',
      data: users,
    });
  }

  @Post()
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.userService.create(body);
    return res.status(HttpStatus.CREATED).json({
      status: 'CREATED',
      message: 'Create user success',
    });
  }

  @Get('/me')
  async getMe(@ReqUser() user: ReqUser, @Res() res: Response) {
    const currentUser = await this.userService.findById(user.id);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get current user success',
      data: currentUser,
    });
  }

  @Get(':id')
  async getById(@Param() params: { id: string }, @Res() res: Response) {
    const user = await this.userService.findById(params.id);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get user success',
      data: user,
    });
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateUserDto,
    @Param() params: { id: string },
    @Res() res: Response,
  ) {
    await this.userService.update(params.id, body);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'update user success',
    });
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }, @Res() res: Response) {
    await this.userService.delete(params.id);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'update user success',
    });
  }
}
