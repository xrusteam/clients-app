import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return next(authReq);
  }

  return next(req);
};
