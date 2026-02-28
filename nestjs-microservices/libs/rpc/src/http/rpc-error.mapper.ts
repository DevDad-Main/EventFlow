import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export function mapRPCErrorToHttp(err: any): never {
  const payload = err?.error ?? err;

  const code = payload?.code as string | undefined;
  const message = payload?.message ?? 'Request Failed.';

  switch (code) {
    case 'BAD_REQUEST':
    case 'VALIDATION_ERROR':
      throw new BadRequestException(message);
    case 'NOT_FOUND':
      throw new NotFoundException(message);
    case 'UNAUTHORIZED':
      throw new UnauthorizedException(message);
    case 'FORBIDDEN':
      throw new ForbiddenException(message);

    default:
      throw new InternalServerErrorException(message);
  }
}
