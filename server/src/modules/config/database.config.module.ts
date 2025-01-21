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
          type: configService.get('POSTGRES_TYPE'),
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          synchronize: configService.get('POSTGRES_SYNC') === 'true',
          autoLoadEntities: true,
          entities: [
            `${__dirname}/../../../database/entities/*.entity{.ts,.js}`,
          ],
        }) as TypeOrmModuleAsyncOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
