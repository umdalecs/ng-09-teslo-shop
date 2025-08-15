import { inject, Injectable, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

  private page = toSignal(
    this.activatedRoute.queryParamMap.pipe(map((params) => params.get('page')))
  );

  public currentPage = linkedSignal(() => {
    const page = this.page();

    if (!page) return 1;

    const parsedNumber = parseInt(page);

    if (isNaN(parsedNumber)) return 1;

    return parsedNumber;
  });
  constructor() {}
}
