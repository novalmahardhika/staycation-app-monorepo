import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterSchema } from './auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Please check email or password');
    }
    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('Please check email or password');
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      ...user,
      accessToken: token,
    };
  }

  async register(payload: RegisterSchema) {
    return this.userService.create(payload);
  }
}
