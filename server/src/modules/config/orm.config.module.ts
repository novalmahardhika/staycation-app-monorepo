import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
          synchronize: configService.get('DB_SYNC') === 'true',
          autoLoadEntities: true,
        }) as TypeOrmModuleAsyncOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
