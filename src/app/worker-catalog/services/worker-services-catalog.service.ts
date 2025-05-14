import { Injectable } from '@angular/core';
import {environment} from '@src/environments/environment';
import {BaseService} from "@/shared/services/base.service";
import { WorkerService } from '@/shared/models/interfaces';

/**
 * API endpoint path for courses obtained from environment configuration.
 */
const categoryResourceEndpointPath = environment.servicesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class WorkerServicesCatalog extends BaseService<WorkerService> {

  /**
   * Initializes the CourseService.
   * Sets up the base URL endpoint for all course-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = categoryResourceEndpointPath;
  }
}
