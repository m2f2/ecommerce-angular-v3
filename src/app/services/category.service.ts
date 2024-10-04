import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private productsUrl = `${environment.URL}/products`;

  constructor(private httpClient: HttpClient) { }

  getCategoryById(id: string): Observable<IProduct[]> {
    const url = `${this.productsUrl}?categoryID=${id}`;
    return this.httpClient.get<IProduct[]>(url).pipe(
      map(products => products.filter(product => product.categoryID == +id))
    );
  }
}
