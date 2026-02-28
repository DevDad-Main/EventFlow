/**
 * RPC Exception Filter - Catches and transforms exceptions in microservices.
 *
 * Exception filters in NestJS intercept errors thrown in controllers/services
 * and transform them into appropriate responses.
 *
 * This filter:
 * 1. Catches all exceptions (@Catch() with no argument catches everything)
 * 2. Wraps them in standardized RpcErrorPayload format
 * 3. Ensures consistent error structure across all microservices
 *
 * Without this filter, errors would be sent as raw messages which makes
 * client-side error handling difficult.
 */
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { RpcErrorPayload } from './rpc.types';

/**
 * @Catch() - Decorator that tells NestJS which exceptions this filter handles.
 *
 * - @Catch(RpcException) - Catches only RpcException
 * - @Catch() - Catches ALL exceptions (what we use here)
 *
 * When combined with extends BaseRpcExceptionFilter, we get nice
 * default handling plus our custom transformation.
 */
@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
  /**
   * catch - The main exception handling method.
   *
   * @param exception - The caught exception (any type)
   * @param host - Provides access to the execution context (HTTP, RPC, etc.)
   *
   * Flow:
   * 1. If it's already an RpcException, let base class handle it (preserve our format)
   * 2. If it's a 400 error (ValidationPipe), wrap as VALIDATION_ERROR
   * 3. Otherwise, wrap as INTERNAL_SERVER_ERROR
   */
  catch(exception: any, host: ArgumentsHost) {
    /**
     * If we already have a RpcException, pass it through.
     * This handles errors thrown by rpcBadRequest(), rpcNotFound(), etc.
     * We don't want to double-wrap these.
     */
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    }

    /**
     * Check if the exception has an HTTP status code.
     * ValidationPipe throws exceptions with getStatus() method.
     */
    const status = exception?.getStatus?.();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    /**
     * Handle ValidationPipe errors (DTO validation failures).
     * ValidationPipe throws when:
     * - whitelist: true - strips non-whitelisted properties
     * - forbidNonWhitelisted: true - throws if extra properties exist
     *
     * We map these to our standardized VALIDATION_ERROR.
     */
    if (status === 400) {
      const payload: RpcErrorPayload = {
        code: 'VALIDATION_ERROR',
        message: 'Validation Error',
        details: response,
      };

      return super.catch(new RpcException(payload), host);
    }

    /**
     * Catch-all for unexpected errors.
     * In production, you might want to:
     * - Log the full error (exception) for debugging
     * - Sanitize details to not leak sensitive info
     * - Send to error tracking service (Sentry, etc.)
     */
    const payload: RpcErrorPayload = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
      details: response,
    };

    return super.catch(new RpcException(payload), host);
  }
}
