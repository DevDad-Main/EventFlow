import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  ping() {
    return {
      ok: true,
      service: 'search',
      now: new Date().toISOString(),
    };
  }
}
