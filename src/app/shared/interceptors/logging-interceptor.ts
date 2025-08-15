import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url);
      }
    })
  );
}
