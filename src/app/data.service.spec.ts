import { TestBed } from '@angular/core/testing';

import { FormDataService } from './FormDataService';

describe('DataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
