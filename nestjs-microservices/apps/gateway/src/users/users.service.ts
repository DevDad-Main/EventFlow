/**
 * UsersService - Handles database operations for User documents.
 *
 * This service provides methods to:
 * 1. Upsert (update or insert) users from Clerk authentication
 * 2. Find users by Clerk user ID
 *
 * It uses Mongoose (MongoDB ODM) for database interactions.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './User.schema';
import { Model } from 'mongoose';

/**
 * @Injectable() - Marks this class as a provider.
 * NestJS will automatically create a single instance (singleton) of this service.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor injection of the User Mongoose model.
   *
   * @InjectModel(User.name) - Injects the User model registered in UserModule.
   * The Model<UserDocument> gives us access to Mongoose methods like:
   * - findOne(), findById(), find()
   * - create(), save()
   * - findOneAndUpdate(), findOneAndDelete()
   * - countDocuments(), aggregate()
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * upsertAuthUser - Creates or updates a user in the database.
   *
   * "Upsert" = "Update if exists, Insert if not"
   *
   * This is called on every user login to:
   * 1. Create new users automatically when they first log in
   * 2. Update existing user info (name, email) if changed in Clerk
   * 3. Update lastSeenAt timestamp for activity tracking
   *
   * @param input - Object containing clerkUserId, email, name
   * @returns The created/updated user document
   */
  async upsertAuthUser(input: {
    clerkUserId: string;
    email: string;
    name: string;
  }) {
    /**
     * findOneAndUpdate - Mongoose method that:
     * 1. Finds a document matching the query (clerkUserId)
     * 2. Updates it with the provided update object
     * 3. If no document matches, inserts a new one (upsert: true)
     * 4. Returns the updated/new document (new: true)
     *
     * Parameters:
     * - First object: Query filter (what to find)
     * - Second object: Update operations
     * - Third object: Options
     */
    return this.userModel.findOneAndUpdate(
      {
        clerkUserId: input.clerkUserId, // Find by Clerk user ID
      },
      {
        // $set: Updates specific fields (doesn't affect other fields)
        $set: {
          email: input.email,
          name: input.name,
          lastSeenAt: new Date(), // Update last seen to now
        },
        // $setOnInsert: Only sets these fields when creating NEW document
        // This is how we set default role='user' only on first login
        $setOnInsert: {
          role: 'user', // Default role for new users
        },
      },
      // Options:
      // - upsert: true = create if doesn't exist
      // - new: true = return the updated document (not the original)
      // - setDefaultsOnInsert: true = apply schema defaults on upsert
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  /**
   * findByClerkUserId - Retrieves a user by their Clerk ID.
   *
   * Used when:
   * - Checking if a user exists
   * - Getting user details for display
   * - Checking user role for authorization
   *
   * @param clerkUserId - The Clerk user ID to search for
   * @returns The user document or null if not found
   */
  async findByClerkUserId(clerkUserId: string) {
    return this.userModel.findOne({ clerkUserId });
  }
}
