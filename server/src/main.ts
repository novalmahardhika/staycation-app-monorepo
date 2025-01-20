import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const getPort = configService.get<string>('PORT');
  const PORT = parseInt(getPort, 10) || 8080;
  await app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
}
bootstrap();
