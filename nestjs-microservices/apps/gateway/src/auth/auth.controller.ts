/**
 * AuthController - Handles authentication-related HTTP routes.
 *
 * @Controller('auth') - Sets the route prefix to /auth
 * So @Get('current-user') handles GET /auth/current-user
 */
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
/**
 * @User() - Custom decorator (defined in currentUser.decorator.ts)
 * Injects the authenticated user's data (from req.user)
 */
import { User } from './currentUser.decorator';
import type { UserContext } from './auth.types';

@Controller('auth')
export class AuthController {
  // Inject AuthService via constructor
  constructor(private readonly authService: AuthService) {}

  /**
   * @Get('current-user') - Handles GET /auth/current-user
   *
   * @User() user - The @User() decorator extracts req.user (set by JwtAuthGuard)
   * and passes it as the 'user' parameter to this function.
   *
   * Since this route is NOT marked with @Public(), JwtAuthGuard runs first.
   * If the token is valid, req.user contains the user's data.
   *
   * Returns the authenticated user's information.
   */
  @Get('current-user')
  getCurrentUser(@User() user: UserContext) {
    // The @User() decorator automatically injects the user object from the request
    return { user };
  }
}
