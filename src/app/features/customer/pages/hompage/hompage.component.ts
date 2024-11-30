import { Component, inject } from '@angular/core';
import { PopularProductComponent } from "../../components/homepage/popular-product/popular-product.component";
import { Store } from '@ngrx/store';
import { selectProducts, selectProductsError, selectProductsLoading } from '../../../../state/product/selector/product.selector';
import { Observable } from 'rxjs';
import { ProductActions } from '../../../../state/product/action/product.action';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-hompage',
  standalone: true,
  imports: [PopularProductComponent, CommonModule, SlickCarouselModule],
  templateUrl: './hompage.component.html',
  styleUrl: './hompage.component.css'
})
export class HompageComponent {

  store = inject(Store);

  paginationProduct$ = this.store.select(selectProducts);
  isLoading$: Observable<boolean> = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts() {
    this.store.dispatch(ProductActions.loadProduct({ pageIndex: 0, pageSize: 10 }))
  }

  slides = [
    { img: "http://placehold.it/800x300/000000" },
    { img: "http://placehold.it/800x300/111111" },
    { img: "http://placehold.it/800x300/333333" },
    { img: "http://placehold.it/800x300/666666" }
  ];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "dots": true, "infinite": false, "autoplay": true };

}
