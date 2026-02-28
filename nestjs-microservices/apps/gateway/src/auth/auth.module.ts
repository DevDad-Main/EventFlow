/**
 * AuthModule - Handles authentication and authorization.
 *
 * This module demonstrates several important NestJS concepts:
 * 1. Module composition - importing other modules (UserModule)
 * 2. Global guards - protecting all routes by default
 * 3. Provider registration - registering services and guards
 */
import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
/**
 * APP_GUARD - A special token that allows you to register a guard at the application level.
 * When you provide a guard with APP_GUARD, it will be applied to ALL routes in ALL modules,
 * rather than just routes in the current module.
 */
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwtAuthGuard';
import { AuthController } from './auth.controller';

@Module({
  // Import UserModule to use UsersService for database operations
  imports: [UserModule],
  // Controllers that belong to this module
  controllers: [AuthController],
  providers: [
    // AuthService - The main authentication service
    // Contains logic for verifying tokens and building user context
    AuthService,

    // Global Guards Defined here.
    // All routes will be protected by this guard by default.
    // Use @Public() decorator to make specific routes accessible without authentication.
    {
      // APP_GUARD is a special provider token that registers the guard globally
      provide: APP_GUARD,
      // Use the JwtAuthGuard class for the guard implementation
      useClass: JwtAuthGuard,
    },
  ],
  // Export AuthService so other modules can use it (e.g., for @User() decorator)
  exports: [AuthService],
})
export class AuthModule {}
