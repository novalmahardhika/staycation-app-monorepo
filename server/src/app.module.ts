import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/config/database.config.module';
import { EnvironmentModule } from './modules/config/env.config,module';
import { DestinationModule } from './modules/destination/destination.module';

@Module({
  imports: [EnvironmentModule, DatabaseModule, UserModule, DestinationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
