import { TestBed } from '@angular/core/testing';

import { PizzaService } from './pizza.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PizzaService', () => {
  let service: PizzaService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PizzaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a funcionario via DELETE', () => {
    const funcionarioId = 1;
    
    service.delete(funcionarioId).subscribe();

    const req = httpMock.expectOne(`${service.API}/${funcionarioId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
