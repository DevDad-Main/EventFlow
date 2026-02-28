/**
 * JwtAuthGuard - A CanActivate guard that protects routes using JWT authentication.
 *
 * Guards determine whether a given request will be handled by the route handler.
 * They run BEFORE the controller method and can:
 * - Allow the request to proceed (return true)
 * - Block the request (return false or throw an exception)
 *
 * This guard:
 * 1. Checks if the route is marked as public (skip authentication)
 * 2. Extracts the JWT token from the Authorization header
 * 3. Verifies the token using Clerk (authentication provider)
 * 4. Upserts the user in the local database
 * 5. Checks for required roles (admin-only routes)
 * 6. Attaches the user to the request object for use in controllers
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
/**
 * Reflector - A utility that allows you to read metadata attached to routes.
 * Metadata is attached using decorators like @Public() or @AdminOnly().
 *
 * Common methods:
 * - get(key) - Get metadata for the current handler only
 * - getAllAndOverride(key) - Get and remove metadata (useful for guards)
 * - getAll(key) - Get metadata from both handler and class
 */
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { REQUIRED_ROLE_KEY } from './admin.decorator';

/**
 * @Injectable() - Marks this class as a provider that can be injected into
 * other components (controllers, other guards, etc.)
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   * Constructor injection - The Reflector, AuthService, and UsersService
   * are automatically injected by NestJS's dependency injection system.
   *
   * - Reflector: Used to read custom decorators (@Public, @AdminOnly)
   * - AuthService: Verifies JWT tokens with Clerk
   * - UsersService: Database operations for users
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  /**
   * canActivate - The main method that determines if a request can proceed.
   *
   * @param context - Contains information about the current request
   *   - context.switchToHttp() - Get HTTP-specific data (request, response)
   *   - context.getHandler() - Get the route handler function
   *   - context.getClass() - Get the controller class
   *
   * @returns boolean - true allows the request, false blocks it
   * Can also throw exceptions to block with specific error messages
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // If route is marked as public, allow access without authentication
    // this.reflector.getAllAndOverride reads metadata set by @Public() decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Check metadata on the specific route handler
      context.getClass(), // Check metadata on the controller class
    ]);

    // If @Public() decorator is present, skip auth entirely
    if (isPublic) {
      return true;
    }

    // Get the HTTP request object from the execution context
    // req contains headers, body, query parameters, etc.
    const req = context.switchToHttp().getRequest();

    // Extract the Authorization header from the request
    // Format: "Bearer <token>" or just the token
    const authorization = req.headers['authorization'];

    // Validate that Authorization header exists
    if (!authorization || typeof authorization !== 'string') {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    // Extract the token from "Bearer <token>" format
    // If header doesn't start with "Bearer ", token will be empty string
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length).trim()
      : '';

    // Validate that we have a token after extraction
    if (!token) {
      throw new UnauthorizedException('Missing Authorization Token');
    }

    console.log('🔐 Auth attempt - Token present:', !!token);

    /**
     * verifyAndBuildContext - Verify the JWT token with Clerk and extract user info.
     *
     * This:
     * 1. Verifies the token signature using CLERK_SECRET_KEY
     * 2. Decodes the JWT payload (contains user info)
     * 3. Returns a UserContext object with clerkUserId, email, name, role
     *
     * Throws UnauthorizedException if token is invalid/expired
     */
    const identifyAuthUser =
      await this.authService.verifyAndBuildContext(token);

    console.log('✅ Token verified, user:', identifyAuthUser.clerkUserId);

    /**
     * upsertAuthUser - Sync the Clerk user with local MongoDB.
     *
     * "Upsert" = "Update if exists, Insert if not"
     *
     * This ensures we always have the latest user data in our database,
     * including updating lastSeenAt timestamp for tracking user activity.
     */
    const dbUser = await this.userService.upsertAuthUser({
      clerkUserId: identifyAuthUser.clerkUserId,
      email: identifyAuthUser.email,
      name: identifyAuthUser.name,
    });

    console.log('📝 Upserting user to DB:', dbUser);

    /**
     * Build the final user object - Combine Clerk data with database role.
     * The database role (from MongoDB) takes precedence over the token role.
     * This allows admins to be set in the database and persist across logins.
     */
    const user = {
      ...identifyAuthUser, // Spread Clerk data (clerkUserId, email, name)
      role: dbUser.role, // Override role with database value
    };

    // Attach user to request object - controllers can access via @User() decorator
    // This is how @User() decorator gets the user data
    req.user = user;

    /**
     * Role-based access control check.
     * @AdminOnly() decorator sets requiredRole to 'admin'.
     * If the route requires admin and user isn't admin, block access.
     */
    const requiredRole = this.reflector.getAllAndOverride<string>(
      REQUIRED_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If route requires admin role and user is not admin, throw 403 Forbidden
    if (requiredRole === 'admin' && user.role !== 'admin') {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }

    // All checks passed - allow the request to proceed to the controller
    return true;
  }
}
