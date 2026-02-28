/**
 * @AdminOnly() Decorator - Marks a route as accessible only to admin users.
 *
 * How it works:
 * 1. SetMetadata attaches metadata with key 'requiredRole' and value 'admin'
 * 2. JwtAuthGuard checks for this metadata using reflector
 * 3. If the route has requiredRole='admin' but user's role !== 'admin', throws 403
 *
 * This implements Role-Based Access Control (RBAC).
 *
 * Usage:
 *   @Get('admin/users')
 *   @AdminOnly()
 *   getAllUsers() { ... }
 *
 * Or combine with @Public() if needed (though rare for admin routes):
 *   @Get('admin/stats')
 *   @Public()
 *   @AdminOnly()
 *   getStats() { ... }
 */
import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key for required role - must match what JwtAuthGuard looks for.
 */
export const REQUIRED_ROLE_KEY = 'requiredRole';

/**
 * Decorator factory - Sets requiredRole to 'admin' in the route metadata.
 */
export const AdminOnly = () => SetMetadata(REQUIRED_ROLE_KEY, 'admin');
