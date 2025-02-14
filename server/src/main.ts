import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomZodValidationPipe } from './common/pipes/zod-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const getPort = configService.get('PORT');
  const PORT = parseInt(getPort, 10) || 8080;

  app.enableCors();
  app.useGlobalPipes(new CustomZodValidationPipe());

  await app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
}
bootstrap();
