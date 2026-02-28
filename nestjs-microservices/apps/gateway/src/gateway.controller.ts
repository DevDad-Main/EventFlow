/**
 * Controller - Handles incoming HTTP requests and maps them to appropriate responses.
 * Think of it as the "route handler" layer.
 *
 * Key decorators:
 * - @Controller() - Marks this class as a controller (can specify prefix like @Controller('users'))
 * - @Get(), @Post(), @Put(), @Delete() - Map HTTP methods to handler functions
 * - @Inject() - Used to inject dependencies (like microservice clients) by name string
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
/**
 * ClientProxy - NestJS's abstract representation of a microservice client.
 * It allows you to send messages to other microservices over various transports (TCP, Redis, RabbitMQ).
 *
 * When you use ClientsModule.register(), you can inject these clients using @Inject('CLIENT_NAME')
 */
import { ClientProxy } from '@nestjs/microservices';
/**
 * firstValueFrom - Converts an RxJS Observable to a Promise.
 * Microservice clients return Observables (reactive streams), not Promises.
 * Use firstValueFrom to get the first emitted value as a Promise.
 */
import { firstValueFrom } from 'rxjs';
import { Public } from './auth/public.decorator';

/**
 * @Controller() - No prefix means this controller handles routes from the root
 * So @Get('health') will respond to GET /health
 */
@Controller()
export class GatewayController {
  /**
   * Constructor injection - NestJS automatically injects the dependencies.
   *
   * @Inject('CATALOG_CLIENT') - This is constructor parameter injection using a string token.
   * The string 'CATALOG_CLIENT' corresponds to the name we registered in ClientsModule.
   *
   * The type ClientProxy gives us access to methods like:
   * - .send(pattern, data) - Send a request/response message (like RPC)
   * - .emit(pattern, data) - Send an event (fire-and-forget, no response)
   */
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
  ) {}

  /**
   * @Get('health') - Handles GET /health
   * @Public() - Custom decorator that marks this route as public (no auth required)
   *
   * This endpoint pings all microservices to check if they're alive.
   * It's useful for load balancers/health checks and for debugging.
   */
  @Get('health')
  @Public() // Custom decorator so it's accessible to anyone
  async health() {
    /**
     * ping - Helper function to check if a microservice is responding.
     *
     * @param service - Name of the service (for logging)
     * @param client - The ClientProxy to send the message to
     *
     * client.send() returns an Observable<any> - a stream that emits the response.
     * We use firstValueFrom() to convert it to a Promise and await it.
     *
     * 'service.ping' - This is the message pattern (pattern matching).
     * The microservice controller uses @MessagePattern('service.ping') to listen for this.
     */
    const ping = async (service: string, client: ClientProxy) => {
      try {
        const result = await firstValueFrom(
          // Send message to microservice - like making an RPC call
          // The microservice will respond with its ping result
          client.send('service.ping', {
            from: 'gateway', // Payload data sent to the microservice
          }),
        );

        return {
          ok: true,
          message: `Service ${service} is alive`,
          result,
        };
      } catch (e: any) {
        console.log(e);
        return {
          ok: false,
          message: `Service ${service} is not alive`,
          error: e?.message ?? 'Unknown error',
        };
      }
    };

    // Promise.all() - Run all ping requests in parallel for better performance
    // instead of waiting for each one sequentially
    const [catalog, media, search] = await Promise.all([
      ping('catalog', this.catalogClient),
      ping('media', this.mediaClient),
      ping('search', this.searchClient),
    ]);

    // Check if ALL services are healthy (every() returns true if all are ok)
    const ok = [catalog, media, search].every((r) => r.ok);

    // Return combined health status
    return {
      ok,
      gateway: {
        service: 'gateway',
        now: new Date().toISOString(), // Current timestamp
      },
      services: { catalog, media, search },
    };
  }
}
