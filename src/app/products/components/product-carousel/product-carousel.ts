import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@/products/pipes/product-image-pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: ``,
})
export class ProductCarousel implements AfterViewInit, OnChanges {
  public readonly images = input.required<string[]>();

  private swiperDiv =
    viewChild.required<ElementRef<HTMLDivElement>>('swiperDiv');

  private swiper: Swiper | null = null;

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].isFirstChange()) {
      return;
    }

    if (!this.swiper) return;

    this.swiper.destroy(true, true);

    const paginationEl: HTMLDivElement | null =
      this.swiperDiv().nativeElement.querySelector('.swiper-pagination');

    paginationEl!.innerHTML = '';

    setTimeout(()=>{
      this.swiperInit();
    },100)
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
