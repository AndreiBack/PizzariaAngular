import { TestBed } from '@angular/core/testing';

import { PizzaService } from './pizza.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PizzaService', () => {
  let service: PizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(PizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
