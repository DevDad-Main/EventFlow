/**
 * CatalogService - Business logic for the catalog microservice.
 *
 * In a real application, this would handle:
 * - Product CRUD operations
 * - Category management
 * - Inventory tracking
 * etc.
 */
import { Injectable } from '@nestjs/common';

/**
 * @Injectable() - Marks this class as a provider that can be injected
 * into controllers and other services within this module.
 */
@Injectable()
export class CatalogService {
  /**
   * ping() - Health check method called by the gateway.
   *
   * Returns a simple object confirming the service is running.
   * This is used by the gateway's /health endpoint to check
   * if all microservices are alive and responding.
   */
  ping() {
    return {
      ok: true,
      service: 'catalog',
      now: new Date().toISOString(),
    };
  }
}
