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
    return this.http.get(this.url).toPromise();
  }
  updateProduct(data: any, _id: any) {
    return this.http.patch<any>('http://localhost:8000/product/' + _id, data);
  }
  deleteProduct(_id: any) {
    return this.http.delete('http://localhost:8000/product/' + _id);
  }
}
