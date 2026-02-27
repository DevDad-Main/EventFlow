import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwtAuthGuard';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    //NOTE: Global Guards Defined here.
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
