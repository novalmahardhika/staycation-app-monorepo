import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from './auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Res() res: Response, @Body() body: SignInDto) {
    const user = await this.authService.signIn(body.email, body.password);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Login success',
      data: user,
    });
  }

  @Public()
  @Post('signUp')
  async register(@Res() res: Response, @Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.CREATED).json({
      status: 'CREATED',
      message: 'Register success',
      data: user,
    });
  }
}
