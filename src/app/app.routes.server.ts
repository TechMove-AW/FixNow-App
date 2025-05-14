import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'customer/worker-catalog/:category',
    renderMode: RenderMode.Client
  },
  {
    path: 'customer/worker-profile/:workerId',
    renderMode: RenderMode.Client
  },
  {
    path: 'tec-section/work-accepted/:requestId',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
