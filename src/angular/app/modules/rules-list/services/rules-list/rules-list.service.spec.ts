import { TestBed } from '@angular/core/testing';

import { RulesListService } from './rules-list.service';

describe('RulesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RulesListService = TestBed.get(RulesListService);
    expect(service).toBeTruthy();
  });
});
