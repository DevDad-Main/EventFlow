import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import {
  Logger,
  ValidationPipe,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { mapRPCErrorToHttp } from '@app/rpc';

/**
 * Bootstrap function - Entry point for the NestJS application.
 * NestFactory creates an application instance from the root module.
 */
async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');

  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters({
    catch(exception: any, host: ArgumentsHost) {
      if (exception instanceof RpcException) {
        return mapRPCErrorToHttp(exception);
      }
      return exception;
    },
  });

  // Enable Cross-Origin Resource Sharing (CORS)
  // Allows your frontend (running on a different origin/port) to make requests to this API
  // origin: array of allowed origins (your frontend URL)
  // credentials: allows cookies/auth headers to be sent cross-origin
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'], // your frontend dev URL
    credentials: true,
  });

  // Enables graceful shutdown hooks - allows the app to finish processing
  // existing requests before shutting down (important for clean deployments)
  app.enableShutdownHooks();

  // Get port from environment variable or default to 3000
  // process.env is populated from your .env file (via ConfigModule in gateway.module.ts)
  const PORT = Number(process.env.GATEWAY_PORT ?? 3000);

  // Start listening for HTTP requests on the specified port
  await app.listen(PORT);
  logger.log(`Gateway running at ${PORT}`);
}

// Call bootstrap to start the application
bootstrap();
