import { TestBed } from '@angular/core/testing';
import { AlerteConsoleService } from './alerte-console.service';

describe('AlerteConsoleService', () => {
  let service: AlerteConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerteConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
