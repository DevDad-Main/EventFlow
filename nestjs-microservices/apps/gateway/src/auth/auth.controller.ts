import { Get, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './currentUser.decorator';
import type { UserContext } from './auth.types';

@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('current-user')
  getCurrentUser(@User() user: UserContext) {
    return { user };
  }
}
