import typeorm from '../../database/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
  ],
  controllers: [],
  providers: [],
})
export class EnvironmentModule {}
