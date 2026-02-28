/**
 * RPC Types - Shared type definitions for microservice-to-microservice communication.
 *
 * These types ensure consistent error handling across all microservices.
 * When services communicate via RabbitMQ, they share these error codes.
 */

/**
 * Standardized error codes for RPC errors.
 * Using consistent codes makes error handling predictable on the client side.
 *
 * - BAD_REQUEST: Invalid input data (400)
 * - VALIDATION_ERROR: DTO validation failed (400)
 * - NOT_FOUND: Resource doesn't exist (404)
 * - UNAUTHORIZED: Missing/invalid authentication (401)
 * - FORBIDDEN: Authenticated but not permitted (403)
 * - INTERNAL_SERVER_ERROR: Unexpected server error (500)
 * - UNKNOWN_ERROR: Catch-all for unexpected errors
 */
export type RpcErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Standardized error payload structure for RPC exceptions.
 *
 * Instead of throwing raw errors, microservices wrap errors in this structure
 * so the calling service knows exactly what happened and how to handle it.
 */
export type RpcErrorPayload = {
  /** Error code from RpcErrorCode - allows programmatic error handling */
  code: RpcErrorCode;
  /** Human-readable error message */
  message: string;
  /** Optional: Additional error details (validation errors, stack trace, etc.) */
  details?: any;
};
