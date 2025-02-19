import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterSchema } from './auth.dto';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private entity: EntityManager,
    private userService: UserService,
    private jwtService: JwtService,
    private notification: NotificationService,
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
    return {
      id: verifyToken.sub,
      email: verifyToken.email,
      role: verifyToken.role,
    };
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

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.signJwtToken(payload);
    return {
      accessToken: token,
    };
  }

  async register(payload: RegisterSchema) {
    await this.entity.transaction(async (manager: EntityManager) => {
      const user = await this.userService.create(payload, manager);
      await this.notification.create(
        {
          title: 'Hallo',
          description: 'Welcome to staycation 🏝️',
          userId: user.id,
        },
        manager,
      );
      return user;
    });
  }
}
