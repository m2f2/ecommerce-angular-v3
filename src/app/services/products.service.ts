import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { INewProduct } from '../models/new-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsURL:string = `${environment.URL}/products`

  constructor(private httpClient: HttpClient) {
  }

  getProducts():Observable<IProduct[]>{
    return  this.httpClient.get<IProduct[]>(this.productsURL);
  }


  getProductById(id: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.productsURL}/${id}`)

  }

  addProduct(product: INewProduct): Observable<INewProduct> {
    return this.httpClient.post<INewProduct>(this.productsURL, product);
  }

  updateProduct(id: number, product: INewProduct): Observable<INewProduct> {
    return this.httpClient.put<INewProduct>(`${this.productsURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.productsURL}/${id}`);
  }
  
  // getProductsByPrice(filterPrice: number){
    // return this.products.filter((product:IProduct) => product.price >= filterPrice);
  // }

}
