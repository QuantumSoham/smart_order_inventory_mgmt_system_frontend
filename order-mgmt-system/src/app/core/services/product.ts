import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ProductService {

  private base = `http://localhost:8051`;

  getProduct(id: number) {
    return this.http.get<Product>(`${this.base}/products/${id}`);
  }

  constructor(private http: HttpClient) {}
}

