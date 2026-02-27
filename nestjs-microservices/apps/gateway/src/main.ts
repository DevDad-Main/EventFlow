import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');

  const app = await NestFactory.create(GatewayModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'], // your frontend dev URL
    credentials: true,
  });

  app.enableShutdownHooks();

  const PORT = Number(process.env.GATEWAY_PORT ?? 3000);

  await app.listen(PORT);
  logger.log(`Gateway runing at ${PORT}`);
}

bootstrap();
