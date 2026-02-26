import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    //NOTE: Register the user model for dependency injection
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
