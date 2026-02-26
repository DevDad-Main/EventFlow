import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Catalog';

  const logger = new Logger('CatalogBootstrap');

  const PORT = Number(process.env.CATALOG_TCP_PORT ?? 4011);

  //NOTE: Create microservices instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: PORT,
      },
    },
  );

  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Catalog service (TCP) listening on: ${PORT}`);
}

bootstrap();
