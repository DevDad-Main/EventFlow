/**
 * RPC Helpers - Utility functions for throwing standardized RPC exceptions.
 *
 * These helpers make it easy to throw consistent errors across all microservices.
 * Instead of creating RpcException manually each time, use these helpers.
 *
 * Example usage in a microservice controller:
 *   if (!product) {
 *     rpcNotFound('Product not found', { productId });
 *   }
 */
import { RpcException } from '@nestjs/microservices';
import { RpcErrorPayload } from './rpc.types';

/**
 * Throws a BAD_REQUEST (400) RPC exception.
 *
 * Use for: Invalid input, malformed requests, business logic validation failures.
 *
 * @param message - Human-readable error message
 * @param details - Optional additional context (input values, field names, etc.)
 *
 * @example
 *   if (isNaN(age)) {
 *     rpcBadRequest('Age must be a valid number', { age });
 *   }
 */
export function rpcBadRequest(message: string, details?: any): never {
  const payload: RpcErrorPayload = { code: 'BAD_REQUEST', message, details };
  throw new RpcException(payload);
}

/**
 * Throws a NOT_FOUND (404) RPC exception.
 *
 * Use for: Resource doesn't exist, item not found in database.
 *
 * @param message - Human-readable error message
 * @param details - Optional additional context (searched IDs, etc.)
 *
 * @example
 *   const user = await this.usersService.findById(id);
 *   if (!user) {
 *     rpcNotFound('User not found', { userId: id });
 *   }
 */
export function rpcNotFound(message: string, details?: any): never {
  const payload: RpcErrorPayload = { code: 'NOT_FOUND', message, details };
  throw new RpcException(payload);
}

/**
 * Throws an INTERNAL_SERVER_ERROR (500) RPC exception.
 *
 * Use for: Unexpected errors, database failures, external API failures.
 * Be careful not to leak sensitive information in the message/details.
 *
 * @param message - Human-readable error message (keep generic for 500s)
 * @param details - Optional additional context (for internal logging)
 */
export function rpcInternalServerError(message: string, details?: any): never {
  const payload: RpcErrorPayload = {
    code: 'INTERNAL_SERVER_ERROR',
    message,
    details,
  };
  throw new RpcException(payload);
}

/**
 * Throws an UNAUTHORIZED (401) RPC exception.
 *
 * Use for: Missing authentication, invalid/missing JWT token.
 *
 * @param message - Custom error message (defaults to 'Unauthorized')
 * @param details - Optional additional context
 */
export function rpcUnauthorized(
  message = 'Unauthorized',
  details?: any,
): never {
  const payload: RpcErrorPayload = {
    code: 'UNAUTHORIZED',
    message,
    details,
  };
  throw new RpcException(payload);
}

/**
 * Throws a FORBIDDEN (403) RPC exception.
 *
 * Use for: Authenticated but not permitted (insufficient permissions, wrong role).
 *
 * @param message - Custom error message (defaults to 'Forbidden')
 * @param details - Optional additional context
 */
export function rpcForbidden(message = 'Forbidden', details?: any): never {
  const payload: RpcErrorPayload = {
    code: 'FORBIDDEN',
    message,
    details,
  };
  throw new RpcException(payload);
}
