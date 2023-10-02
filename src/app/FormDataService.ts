import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  setProductData(value: any) {
    throw new Error('Method not implemented.');
  }
  private formDataSubject = new Subject<any>();
  formData$ = this.formDataSubject.asObservable();

  updateFormData(data: any) {
    this.formDataSubject.next(data);
  }
}