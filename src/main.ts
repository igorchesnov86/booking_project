import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {createSwaggerDocument} from './utils/swagger.js';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = createSwaggerDocument(app);
  SwaggerModule.setup('swagger',app,swaggerDocument);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
