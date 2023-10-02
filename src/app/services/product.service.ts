import { Injectable } from '@angular/core';
import { RootService } from '../root.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends RootService {

  search<T>(text: any): Observable<T> {
    return this.http.post<T>(this.url + "/products/search", text);
  }
  search2<T>(text: any): Observable<T> {
    return this.http.post<T>(this.url + "/products/search2", text);
  }

}
