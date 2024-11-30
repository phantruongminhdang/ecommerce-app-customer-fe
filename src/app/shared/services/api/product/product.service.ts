import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { ProductResponseDTO } from '../../../models/Product/ProductResponseDTO';
import { ProductRequestDTO } from '../../../models/Product/ProductRequestDTO';
import { Pagination } from '../../../models/Pagination/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(pageIndex: number = 0, pageSize: number = 10): Observable<Pagination<ProductResponseDTO>> {
    return this.http.get<Pagination<ProductResponseDTO>>(
      Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_ALL + `?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  filterProducts(pageIndex: number = 0, pageSize: number = 10, keyword: string, categoryId: string, minPrice: number, maxPrice: number): Observable<Pagination<ProductResponseDTO>> {
    const params: any = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    if (keyword != '') params.Keyword = keyword;
    if (categoryId != '') params.CategoryId = categoryId;
    if (minPrice != 0) params.MinPrice = minPrice;
    if (maxPrice != 0) params.MaxPrice = maxPrice;
    return this.http.get<Pagination<ProductResponseDTO>>(
      Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_ALL,
      {
        params: params
      }
    )
  }

  getProductByIdForCustomer(productId: string): Observable<ProductResponseDTO> {
    return this.http.get<ProductResponseDTO>(Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_By_ID_FOR_CUSTOMER(productId));
  }

  getProductById(productId: string): Observable<ProductRequestDTO> {
    return this.http.get<ProductRequestDTO>(Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_BY_ID(productId));
  }

  saveProduct(productObj: ProductRequestDTO, productId: string): Observable<any> {
    return this.http.put(
      Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_BY_ID(productId),
      productObj
    )
  }

  addProduct(productObj: ProductRequestDTO): Observable<any> {
    return this.http.post(
      Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_ALL,
      productObj
    )
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(Constant.API_URL + Constant.API_RESOURCES.PRODUCTS.GET_BY_ID(productId));
  }
}
