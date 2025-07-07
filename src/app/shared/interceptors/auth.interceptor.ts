import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.token;

  console.log(`[Interceptor] Petición a: ${req.url}`);

  // Si tenemos un token y la petición no es para login/signup, lo añadimos.
  if (token && !req.url.includes('/accounts/signin') && !req.url.includes('/accounts/signup')) {

    console.log(`[Interceptor] Token encontrado. Añadiendo cabecera 'Authorization'.`);

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  console.log(`[Interceptor] No se añadió token a la petición.`);
  return next(req);
};
