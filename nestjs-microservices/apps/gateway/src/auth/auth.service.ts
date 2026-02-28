/**
 * AuthService - Core authentication logic using Clerk as the identity provider.
 *
 * This service handles:
 * 1. Creating a Clerk client for API interactions
 * 2. Verifying JWT tokens from the Authorization header
 * 3. Building a UserContext object from the verified token
 */
import { createClerkClient, verifyToken } from '@clerk/backend';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserContext } from './auth.types';

/**
 * @Injectable() - Marks this class as a provider that can be injected
 * into controllers, guards, and other services.
 */
@Injectable()
export class AuthService {
  /**
   * createClerkClient - Initializes the Clerk SDK client.
   *
   * Clerk is an authentication-as-a-service platform.
   * It handles user management, login flows, and JWT token issuance.
   *
   * Environment variables:
   * - CLERK_SECRET_KEY: Your secret key from Clerk dashboard (server-side)
   * - CLERK_PUBLISHABLE_KEY: Public key from Clerk dashboard (can be used client-side)
   *
   * This client is used for:
   * - Verifying tokens
   * - Fetching user details from Clerk
   */
  private readonly clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });

  /**
   * jwtVerifyOptions - Configuration for token verification.
   *
   * verifyToken() checks that:
   * 1. Token was signed with your CLERK_SECRET_KEY
   * 2. Token hasn't expired
   * 3. Token is properly formatted
   */
  private jwtVerifyOptions(): Record<string, any> {
    return {
      secretKey: process.env.CLERK_SECRET_KEY,
    };
  }

  /**
   * verifyAndBuildContext - Main authentication method.
   *
   * @param token - JWT token from the Authorization header (without "Bearer " prefix)
   * @returns UserContext - Object containing user information
   *
   * Process:
   * 1. Verify the token using Clerk's verifyToken()
   * 2. Extract user ID from the token payload
   * 3. Try to get email/name from token (fast path)
   * 4. If not in token, fetch full user details from Clerk API (slower but complete)
   * 5. Return standardized UserContext object
   */
  async verifyAndBuildContext(token: string): Promise<UserContext> {
    try {
      /**
       * verifyToken - Validates the JWT token.
       *
       * On success: Returns decoded payload containing:
       * - sub / userId: Clerk's unique user ID
       * - email / email_address / primaryEmailAddress: User's email
       * - name / fullName / username: User's name
       *
       * On failure: Throws an error (expired, invalid signature, etc.)
       */
      const verified: any = await verifyToken(token, this.jwtVerifyOptions());

      // The decoded token payload - contains user information
      // Clerk returns it in slightly different formats depending on token version
      const payload = verified?.payload ?? verified?.payload ?? verified;

      // Extract Clerk user ID from payload (primary identifier)
      // 'sub' is the standard JWT subject claim, 'userId' is Clerk-specific
      const clerkUserId = payload?.sub ?? payload?.userId;

      // Validate that we have a user ID - if not, token is invalid/malformed
      if (!clerkUserId) {
        throw new UnauthorizedException('Token is not valid, missing user ID.');
      }

      // Default role is 'user' - can be elevated to 'admin' in the database
      // This allows role management through your app, not just Clerk
      const role: 'user' | 'admin' = 'user';

      /**
       * Try to get email from token payload first (faster - no extra API call).
       * Clerk can include email in the token claims if configured in Clerk dashboard.
       * Check multiple possible claim names for compatibility.
       */
      const emailFromToken =
        payload?.email ??
        payload?.email_address ??
        payload?.primaryEmailAddress ??
        '';

      /**
       * Try to get name from token payload first (faster).
       */
      const nameFromToken =
        payload?.name ?? payload?.fullName ?? payload?.username ?? '';

      /**
       * If we have both email and name from token, return early (fast path).
       * This avoids an extra API call to Clerk.
       */
      if (emailFromToken && nameFromToken) {
        return {
          clerkUserId,
          email: emailFromToken,
          name: nameFromToken,
          role,
        };
      }

      /**
       * Slow path: Token didn't have complete user info.
       * Fetch full user details from Clerk API.
       *
       * clerk.users.getUser() makes an HTTP request to Clerk's API
       * to get the complete user profile.
       */
      const user = await this.clerk.users.getUser(clerkUserId);

      /**
       * Find the user's primary email address.
       * A user can have multiple emails; primaryEmailAddressId points to the main one.
       */
      const primaryEmail =
        user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
          ?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

      /**
       * Build full name from available fields.
       * Priority: firstName + lastName > username > email > userId
       */
      const fullName =
        [user.firstName, user.lastName].filter(Boolean).join(' ') ||
        user.username ||
        primaryEmail ||
        clerkUserId;

      /**
       * Return complete user context.
       * Use token values if available, otherwise use Clerk API values.
       */
      return {
        clerkUserId,
        email: emailFromToken || primaryEmail,
        name: nameFromToken || fullName,
        role,
      };
    } catch (e: any) {
      // Wrap any error as UnauthorizedException with a clean message
      throw new UnauthorizedException(
        e.message ?? 'Invalid or expired clerk token.',
      );
    }
  }
}
