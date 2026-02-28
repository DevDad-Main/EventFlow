import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

/**
 * Bootstrap function - Entry point for the NestJS application.
 * NestFactory creates an application instance from the root module.
 */
async function bootstrap() {
  // Set process title for easier identification in process lists (e.g., ps aux)
  process.title = 'gateway';

  // Logger instance - used for logging messages with the prefix 'GatewayBootstrap'
  const logger = new Logger('GatewayBootstrap');

  // Create the NestJS application instance from the root module (GatewayModule)
  // This is where all your modules, controllers, and providers get wired together
  const app = await NestFactory.create(GatewayModule);

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
