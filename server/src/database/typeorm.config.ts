import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DATABASE}`,
  autoLoadEntities: true,
  synchronize: false,
  entities: [`src/database/entities/*.entity{.ts,.js}`],
  migrations: [`src/database/migrations/*{.ts,.js}`],
  seeds: ['src/database/seeders/*.seeder{.ts,.js}'],
  factories: ['src/database/factories/*.factory{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const datasource = new DataSource(
  config as DataSourceOptions & SeederOptions,
);
