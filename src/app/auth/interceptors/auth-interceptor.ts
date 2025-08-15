import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  const reqClone = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(reqClone);
};
