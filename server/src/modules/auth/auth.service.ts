import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterSchema } from './auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async comparePassword(password: string, encryptedPassword: string) {
    return await compare(password, encryptedPassword);
  }

  async hashPassword(password: string, salt: number = 10) {
    return await hash(password, salt);
  }

  async signJwtToken(payload: { sub: string; email: string }) {
    return await this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token: string) {
    const verifyToken = await this.jwtService.verify(token, {
      secret: 'secret',
    });
    return await this.userService.findThrowById(verifyToken.sub);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Please check email or password');
    }

    const matchPassword = await this.comparePassword(password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('Please check email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.signJwtToken(payload);
    return {
      accessToken: token,
    };
  }

  async register(payload: RegisterSchema) {
    const encryptedPassword = await this.hashPassword(payload.password);
    return this.userService.create({
      ...payload,
      password: encryptedPassword,
    });
  }
}
