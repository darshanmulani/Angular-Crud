import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductAPIService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class TestResolver implements Resolve<any> {
  constructor(private product:ProductAPIService ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.product.getProduct().then()
  }
}
