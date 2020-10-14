import { TestBed } from '@angular/core/testing';

import { ExplanationService } from './explanation.service';

describe('ExplanationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExplanationService = TestBed.get(ExplanationService);
    expect(service).toBeTruthy();
  });
});
