import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupuserService {
  url = 'http://localhost:8000/loginuser';
  constructor(private http: HttpClient) {}

  signupuser(data: any) {
    return this.http.post(this.url, data);
  }
}
