/**
 * RPC Setup - Applies global pipes and filters to all microservices.
 *
 * This is a utility function that should be called during microservice bootstrap.
 * It applies consistent error handling and validation across all microservices.
 *
 * Usage in a microservice main.ts:
 *   import { applyRPCToMicroservicesLayer } from '@app/rpc';
 *   const app = await NestFactory.createMicroservice(...);
 *   applyRPCToMicroservicesLayer(app);
 *   await app.listen();
 */
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './rpc-exception.filter';

/**
 * applyRPCToMicroservicesLayer - Applies global middleware to a microservice.
 *
 * This function should be called AFTER creating the microservice but BEFORE listening.
 *
 * @param app - The microservice application instance (INestMicroservice)
 *
 * What it sets up:
 * 1. Global ValidationPipe - validates DTOs on all incoming messages
 * 2. Global Exception Filter - standardized error responses
 */
export function applyRPCToMicroservicesLayer(app: INestMicroservice) {
  /**
   * ValidationPipe - Automatically validates incoming data against DTOs.
   *
   * Options:
   * - whitelist: true - Removes properties not defined in the DTO
   * - transform: true - Transforms payloads to DTO instances (e.g., string to number)
   * - forbidNonWhitelisted: true - Throws if extra properties are present
   *
   * With these options, if a client sends:
   *   { name: "John", age: "25", unknownField: "bad" }
   *
   * And the DTO is:
   *   class CreateUserDto { name: string; age: number; }
   *
   * The pipe will:
   * 1. Transform "25" to 25 (transform: true)
   * 2. Remove unknownField (whitelist: true)
   * 3. Or throw error (forbidNonWhitelisted: true)
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * useGlobalFilters - Registers an exception filter for all handlers.
   *
   * Any exception thrown in the microservice will be caught by RpcExceptionFilter
   * and transformed into a standardized RpcErrorPayload response.
   */
  app.useGlobalFilters(new RpcExceptionFilter());
}
