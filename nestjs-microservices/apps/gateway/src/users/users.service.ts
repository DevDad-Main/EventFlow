import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  //#region Upsert Auth User
  /**
   * Upsert a user document in the database
   * @param input	Clerk user id, email, and name
   * @returns	The upserted user document
   */
  async upsertAuthUser(input: {
    clerkUserId: string;
    email: string;
    name: string;
  }) {
    return this.userModel.findOneAndUpdate(
      {
        clerkUserId: input.clerkUserId,
      },
      {
        $set: {
          email: input.email,
          name: input.name,
          lastSeenAt: new Date(),
        },
        $setOnInsert: {
          role: 'user',
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  //#endregion

  //#region Find Clerk User
  /**
   * Find a user document by Clerk user id
   * @param clerkUserId	Clerk user id
   * @returns	The user document
   */
  async findByClerkUserId(clerkUserId: string) {
    return this.userModel.findOne({ clerkUserId });
  }
  //#endregion
}
