import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  url = 'http://localhost:8000/product';
  constructor(private http: HttpClient) {}

  addProduct(data: any) {
    return this.http.post<any>(this.url, data);
  }
  getProduct() {
    return this.http.get<any>(this.url);
  }
  updateProduct(data: any, id: any) {
    return this.http.patch<any>('http://localhost:8000/product' + id, data);
  }
  deleteProduct(id: any) {
    return this.http.delete('http://localhost:8000/product' + id);
  }
}
