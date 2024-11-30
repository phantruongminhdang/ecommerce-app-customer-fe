import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts, selectProductsError, selectProductsLoading } from '../../../../state/product/selector/product.selector';
import { Observable } from 'rxjs';
import { ProductActions } from '../../../../state/product/action/product.action';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../shared/services/api/category/category.service';
import { ProductComponent } from "../../components/product/product/product.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  store = inject(Store);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  categoryService = inject(CategoryService);

  categories: any[] = []

  pageIndex: number = 0;
  pageSize: number = 12;
  keyword: string = '';
  categoryId: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;


  paginationProduct$ = this.store.select(selectProducts);
  isLoading$: Observable<boolean> = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  pages: number[] = [];

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.pageIndex = Number.parseInt(params.get('pageIndex') || '0');
      this.pageSize = Number.parseInt(params.get('pageSize') || '8');
      this.keyword = params.get('keyword') || '';
      this.categoryId = params.get('categoryId') || '';
      this.minPrice = Number.parseInt(params.get('minPrice') || '0');
      this.maxPrice = Number.parseInt(params.get('maxPrice') || '0');

      this.getAllProducts();
    })
    this.getAllCategories();

    this.paginationProduct$.subscribe(
      {
        next: (res) => {
          if (res != null)
            this.pages = this.getPages(res.pageIndex + 1, res.totalPagesCount);
          console.log(res);

        }
      }
    )
  }

  getAllProducts() {
    console.log(this.pageIndex, this.pageSize, this.keyword, this.categoryId, this.minPrice, this.maxPrice);

    this.store.dispatch(ProductActions.filterProduct(
      {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword,
        categoryId: this.categoryId,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
    ))
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  filterByPageSize(event: any) {
    this.router.navigate(
      ['/product'],
      {
        queryParams: { pageSize: event.target.value },
        queryParamsHandling: 'merge'
      },
    );
  }
  filterByKeyword(event: any) {
    setTimeout(() => {
      this.router.navigate(
        ['/product'],
        {
          queryParams: { keyword: event.target.value },
          queryParamsHandling: 'merge'
        },
      );
    }, 1000);
  }

  filterByMinPrice(event: any) {
    this.router.navigate(
      ['/product'],
      {
        queryParams: { minPrice: event.target.value },
        queryParamsHandling: 'merge'
      },
    );
  }

  filterByMaxPrice(event: any) {
    this.router.navigate(
      ['/product'],
      {
        queryParams: { maxPrice: event.target.value },
        queryParamsHandling: 'merge'
      },
    );
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 3) {
      return Array.from({ length: total }, (e, i) => i + 1)
    }
    if (current == 1) {
      return [current, current + 1, current + 2]
    }
    if (current == total) {
      return [current - 2, current - 1, current]
    }

    return [current - 1, current, current + 1]
  }
}
