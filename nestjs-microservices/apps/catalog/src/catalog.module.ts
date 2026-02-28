/**
 * CatalogModule - The microservice module for catalog functionality.
 *
 * This is a microservice (not a regular HTTP API).
 * It uses RabbitMQ to communicate with other services (like the gateway).
 *
 * To run this microservice, you'd use:
 *   nest start catalog
 * or specifically as microservice:
 *   nest start --entryFile main
 */
import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  // imports: [] - Add other modules here if needed (e.g., database, external APIs)
  imports: [],
  // Controllers - Handle incoming messages from RabbitMQ
  // @MessagePattern handlers are registered here
  controllers: [CatalogController],
  // Providers - Services and other injectable components
  providers: [CatalogService],
})
export class CatalogModule {}
