/**
 * @User() Decorator - Injects the authenticated user's data into a controller method.
 *
 * How it works:
 * 1. createParamDecorator - Creates a custom parameter decorator
 * 2. The function receives the ExecutionContext (contains request info)
 * 3. We extract req.user (which was set by JwtAuthGuard)
 * 4. Return the user object to be used in the route handler
 *
 * This is a "Parameter Decorator" - it decorates a specific parameter
 * rather than the entire function/method.
 *
 * Usage in controller:
 *   @Get('profile')
 *   getProfile(@User() user: UserContext) {
 *     return { name: user.name, email: user.email };
 *   }
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from './auth.types';

/**
 * createParamDecorator - Factory function that creates a decorator for function parameters.
 *
 * First argument (unused here): Raw arguments passed to the decorator
 * Second argument: ExecutionContext - provides access to the request/response
 */
export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    // Get the HTTP request object from the execution context
    const req = ctx.switchToHttp().getRequest();

    // Return the user object that was attached by JwtAuthGuard
    // This contains: clerkUserId, email, name, role
    return req.user as UserContext | undefined;
  },
);
