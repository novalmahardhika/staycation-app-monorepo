import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/config/database.config.module';
import { EnvironmentModule } from './modules/config/env.config,module';
import { HomestayModule } from './modules/homestay/homestay.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    HomestayModule,
    AuthModule,
    BookingModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
