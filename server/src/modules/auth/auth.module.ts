import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Notification } from 'src/database/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notification]),
    JwtModule.register({
      secret: 'secret',
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    AuthService,
    UserService,
    NotificationService,
  ],
})
export class AuthModule {}
