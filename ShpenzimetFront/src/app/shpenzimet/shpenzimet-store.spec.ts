import { TestBed } from '@angular/core/testing';
import { ShpenzimetStore } from './shpenzimet-store';

describe('ShpenzimetStore', () => {
  let service: ShpenzimetStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShpenzimetStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
