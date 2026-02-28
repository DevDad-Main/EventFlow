/**
 * CatalogController - Handles microservice message patterns.
 *
 * This is a microservice controller - it doesn't handle HTTP requests directly.
 * Instead, it listens for messages from other services via RabbitMQ.
 *
 * Key difference from HTTP controllers:
 * - Uses @MessagePattern() instead of @Get(), @Post(), etc.
 * - Uses @EventPattern() for event-driven communication
 *
 * The gateway sends messages using client.send('pattern', data).
 * This controller listens for that pattern and responds.
 */
import { Controller } from '@nestjs/common';
import { CatalogService } from './catalog.service';
/**
 * @MessagePattern - Decorator that marks a method as a message handler.
 *
 * When another service sends: client.send('service.ping', { from: 'gateway' })
 * NestJS routes this message to any method decorated with @MessagePattern('service.ping')
 *
 * The method's return value is sent back to the caller as the response.
 * This is similar to RPC (Remote Procedure Call) - calling a function on another service.
 */
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CatalogController {
  // Inject the CatalogService (business logic)
  constructor(private readonly catalogService: CatalogService) {}

  /**
   * @MessagePattern('service.ping') - Listen for 'service.ping' messages.
   *
   * This allows the gateway to check if this service is running and healthy.
   * The gateway sends: client.send('service.ping', { from: 'gateway' })
   * This method responds with the result from catalogService.ping()
   *
   * Note: Unlike HTTP where you have URL routing, with microservice patterns
   * you use message patterns (strings) to route messages.
   */
  @MessagePattern('service.ping')
  ping() {
    return this.catalogService.ping();
  }
}
