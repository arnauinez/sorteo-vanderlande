/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoundsService } from './sounds.service';

describe('Service: Sounds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundsService]
    });
  });

  it('should ...', inject([SoundsService], (service: SoundsService) => {
    expect(service).toBeTruthy();
  }));
});
