/**
 * Module - A fundamental building block in NestJS.
 * Modules organize the application into cohesive blocks of functionality.
 * Each module typically has: controllers (routes), providers (services), and imports (other modules).
 */
import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { EventsModule } from './events/events.module';
import { EventsController } from './events/events.controller';

@Module({
  imports: [
    // ConfigModule - Loads environment variables from .env into process.env
    // isGlobal: true makes these variables available throughout the entire app
    // (no need to import ConfigModule in every module)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongooseModule - Connects to MongoDB database
    // Uses the MONGO_URI from environment variables
    // This gives the application access to MongoDB for storing/retrieving data
    MongooseModule.forRoot(process.env.MONGO_URI as string),

    // Import UserModule - provides user-related functionality (database operations)
    UserModule,
    // Import AuthModule - provides authentication/authorization functionality
    AuthModule,

    // Import EventsModule - provides event-related functionality (database operations)
    EventsModule,

    // ClientsModule - Registers microservice clients for inter-service communication
    // This gateway communicates with other microservices via RabbitMQ (RMQ)
    // Each entry creates a named client that can be injected into controllers/services
    ClientsModule.register([
      {
        // Name used for injection - @Inject('CATALOG_CLIENT')
        name: 'CATALOG_CLIENT',
        // Transport.RMQ tells NestJS to use RabbitMQ as the message broker
        transport: Transport.RMQ,
        // Connection options for RabbitMQ
        options: {
          // RabbitMQ server URL(s)
          urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          // Queue name - messages for catalog service go here
          queue: process.env.CATALOG_QUEUE ?? 'catalog_queue',
          // Queue options - durable: false means queue is not persisted to disk
          queueOptions: { durable: false },
        },
      },
      {
        name: 'MEDIA_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          queue: process.env.MEDIA_QUEUE ?? 'media_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'SEARCH_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
          queue: process.env.SEARCH_QUEUE ?? 'search_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  // Controllers - Handle incoming HTTP requests and return responses
  // GatewayController handles routes like GET /health
  controllers: [GatewayController, AuthController, EventsController],
  // Providers - Services, guards, factories that can be injected into other providers
  // GatewayService is a standard service (marked with @Injectable)
  providers: [GatewayService],
})
export class GatewayModule {}
