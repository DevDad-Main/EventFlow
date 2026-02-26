import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Search';
  const logger = new Logger('SearchBootstrap');
  const PORT = Number(process.env.SEARCH_TCP_PORT ?? 4012);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
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
  logger.log(`Search service (TCP) listening on: ${PORT}`);
}
bootstrap();
