import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styles: ``
})
export class Pagination {
  public readonly currentPage = input<number>(1);
  public readonly pages = input.required<number>();

  public pageChange = output<number>()

  protected pagesArray = computed(() => {
    return Array.from({length: this.pages()}, (_, i) => i + 1);
  })
}
