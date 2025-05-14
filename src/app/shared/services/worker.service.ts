import { Injectable } from '@angular/core';
import {environment} from '@src/environments/environment';
import {BaseService} from "@/shared/services/base.service";
import { Worker } from '@/shared/models/interfaces';

/**
 * API endpoint path for workers obtained from environment configuration.
 */
const workerResourceEndpointPath = environment.workersEndpointPath;

/**
 * Service responsible for managing worker-related HTTP operations.
 * Extends BaseService to provide CRUD operations for Worker entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/workers     - Retrieve all workers
 * - GET    /api/workers/:id - Retrieve a specific worker
 * - POST   /api/workers     - Create a new worker
 * - PUT    /api/workers/:id - Update an existing worker
 * - DELETE /api/workers/:id - Delete a worker
 *
 * @example
 * ```typescript
 * constructor(private workerService: WorkerService) {}
 *
 * // Get all workers
 * workerService.getAll().subscribe(workers => {...});
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<Worker> {

  /**
   * Initializes the WorkerService.
   * Sets up the base URL endpoint for all worker-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = workerResourceEndpointPath;
  }
}