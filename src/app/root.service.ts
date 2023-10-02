import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(protected http: HttpClient) { }

  url: string = environment.url;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
  // all<T>(next: string, parPage: number = 2, page: number = 1): Observable<T> {
  //   return this.http.get<T>(this.url + `/${next}` + '/all?page=' + `${page}` + '&item=' + parPage);
  // }
   all<T>(next: string): Observable<T> {
    return this.http.get<T>(this.url + `/${next}`);
  }

  add<T>(next: string, data: any): Observable<T> {
    return this.http.post<T>(this.url + `/${next}`,data);
  }

  update<T, U>(next: string, data: U, id: number): Observable<T> {
    return this.http.post<T>(this.url + `/${next}` + '/editer/' + `${id}`, data)
  }

  byId<T>(id: number, next: string) {
    return this.http.get<T>(this.url + `/${next}/${id})`)
  }
}