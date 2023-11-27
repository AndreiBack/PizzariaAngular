import { TestBed } from '@angular/core/testing';

import { SaborService } from './sabor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SaborService', () => {
  let service: SaborService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SaborService);
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
