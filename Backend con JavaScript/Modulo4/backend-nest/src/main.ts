import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agregamos el prefijo api a todas las rutas
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
