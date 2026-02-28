/**
 * User Mongoose Schema - Defines the structure of the User collection in MongoDB.
 *
 * Mongoose is an ODM (Object Document Mapper) for MongoDB.
 * It lets you define schemas that map to MongoDB documents.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * HydratedDocument<User> - TypeScript type that represents a full User document
 * with all the Mongoose methods (save, find, etc.) mixed in.
 *
 * Usage: const user = await UserModel.findOne({...})
 * The result is typed as UserDocument
 */
export type UserDocument = HydratedDocument<User>;

/**
 * @Schema() - Decorator that marks a class as a Mongoose schema definition.
 * { timestamps: true } - Automatically adds createdAt and updatedAt fields.
 */
@Schema({ timestamps: true })
export class User {
  /**
   * @Prop() - Defines a property/field in the schema.
   *
   * Options:
   * - required: Field must be present (throws error if not)
   * - unique: Creates a unique index (no two documents can have same value)
   * - index: Creates a regular index for faster queries
   * - enum: Restricts values to specific options
   * - default: Default value if not provided
   */

  /**
   * clerkUserId - The unique identifier from Clerk (your auth provider).
   * This is the link between your local user and Clerk's user.
   *
   * unique: true + index: true = unique index for fast lookups
   * We frequently query by clerkUserId (every login), so indexing is important.
   */
  @Prop({ required: true, unique: true, index: true })
  clerkUserId: string;

  /**
   * name - User's display name.
   */
  @Prop({ required: true })
  name: string;

  /**
   * email - User's email address.
   * Stored for reference/display purposes.
   */
  @Prop({ required: true, unique: true })
  email: string;

  /**
   * role - User's role for authorization.
   *
   * enum: ['user', 'admin'] - Only these two values are allowed.
   * default: 'user' - New users start with 'user' role.
   *
   * This is set in the database, NOT in the Clerk token.
   * Allows you to promote users to admin without modifying Clerk.
   */
  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  /**
   * lastSeenAt - Timestamp of user's last authentication.
   * Useful for tracking activity, showing "last seen", etc.
   * Updated every time user logs in.
   */
  @Prop({ required: true })
  lastSeenAt: Date;
}

/**
 * SchemaFactory.createForClass(User) - Creates the Mongoose Schema
 * from the User class decorators and properties.
 *
 * This schema is then used in the UserModule to create the UserModel.
 */
export const UserSchema = SchemaFactory.createForClass(User);
