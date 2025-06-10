import { Injectable } from '@angular/core';
import { RootService } from '../root.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService extends RootService {
  search<T>(event: any): Observable<T> {
    return this.http.post<T>(this.url + '/utilisateurs/login', event);
  }

  isAuthenticated() {
    return localStorage.getItem('tkn');
  }

  loggout<T>(event: any): Observable<T> {
    return this.http.post<T>(this.url + '/utilisateurs/logout', event);
  }
}
