import { TestBed } from '@angular/core/testing';

import { RouteGardService } from './route-gard.service';

describe('RouteGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteGardService = TestBed.get(RouteGardService);
    expect(service).toBeTruthy();
  });
});
