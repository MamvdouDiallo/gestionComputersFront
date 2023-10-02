import { Injectable } from '@angular/core';
import { User } from './Interface';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  sharedInfo!: User;

  setSharedInfo(info: User) {
    this.sharedInfo = info;
  }

  getSharedInfo() {
    return this.sharedInfo;
  }
}
