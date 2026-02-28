/**
 * @Public() Decorator - Marks a route as publicly accessible (no auth required).
 *
 * How it works:
 * 1. SetMetadata - A NestJS function that attaches metadata to a route handler
 * 2. IS_PUBLIC_KEY - The metadata key ('isPublic') that JwtAuthGuard looks for
 * 3. When JwtAuthGuard runs, it checks if this metadata exists
 *    - If exists: allows the request through without checking the token
 *    - If not exists: requires valid JWT token
 *
 * Usage:
 *   @Get('health')
 *   @Public()
 *   health() { ... }
 *
 * This is an example of the "Decorator" pattern - a clean way to add
 * metadata/behavior to functions without modifying their implementation.
 */
import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key - Convention to avoid typos when reading/writing this metadata.
 * Must match what JwtAuthGuard looks for.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator factory - When applied to a route handler, sets isPublic: true metadata.
 *
 * The @Public() syntax is syntactic sugar that calls SetMetadata(IS_PUBLIC_KEY, true).
 * NestJS intercepts this and attaches the metadata to the route handler.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
