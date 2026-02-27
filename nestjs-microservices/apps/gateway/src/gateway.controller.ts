import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Public } from './auth/public.decorator';

@Controller()
export class GatewayController {
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
  ) {}

  @Get('health')
  @Public() //NOTE: Custom decorator so it's accessible to anyone
  async health() {
    const ping = async (service: string, client: ClientProxy) => {
      try {
        const result = await firstValueFrom(
          client.send('service.ping', {
            from: 'gateway',
          }),
        );

        return {
          ok: true,
          message: `Service ${service} is alive`,
          result,
        };
      } catch (e: any) {
        console.log(e);
        return {
          ok: false,
          message: `Service ${service} is not alive`,
          error: e?.message ?? 'Unknown error',
        };
      }
    };

    const [catalog, media, search] = await Promise.all([
      ping('catalog', this.catalogClient),
      ping('media', this.mediaClient),
      ping('search', this.searchClient),
    ]);

    const ok = [catalog, media, search].every((r) => r.ok);
    return {
      ok,
      gateway: {
        service: 'gateway',
        now: new Date().toISOString(),
      },
      services: { catalog, media, search },
    };
  }
}
