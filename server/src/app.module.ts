import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/config/orm.config.module';
import { EnvironmentModule } from './modules/config/env.config,module';

@Module({
  imports: [EnvironmentModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
