/**
 * RPC Module - A shared library module for RPC/microservice utilities.
 *
 * This is a NestJS library (see nest-cli.json libs section).
 * It provides reusable components that can be imported by any microservice.
 *
 * What's included:
 * - RpcExceptionFilter - Global exception handling
 * - ValidationPipe configuration
 * - Helper functions (rpcBadRequest, rpcNotFound, etc.)
 * - Type definitions (RpcErrorPayload, RpcErrorCode)
 *
 * This is a SHARED MODULE - it doesn't have any providers itself,
 * but exporting it allows other modules to import and use the utilities.
 */
import { Module } from '@nestjs/common';

@Module({})
export class RpcModule {}

/**
 * NOTE: This module doesn't export anything because the utilities
 * (rpc helpers, filters) are used via imports, not dependency injection.
 *
 * To use these in a microservice:
 *
 * 1. Import the library in nest-cli.json (already done as @app/rpc)
 *
 * 2. Use the helpers directly (no import needed):
 *    import { rpcNotFound } from '@app/rpc';
 *
 *    // In a controller:
 *    rpcNotFound('User not found');
 *
 * 3. Apply the global filter/pipe in main.ts:
 *    import { applyRPCToMicroservicesLayer } from '@app/rpc';
 *
 *    const app = await NestFactory.createMicroservice(...);
 *    applyRPCToMicroservicesLayer(app);
 */
