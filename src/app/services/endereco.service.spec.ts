import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EnderecoService } from './endereco.service';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnderecoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should delete an address via DELETE', () => {
    const enderecoId = 1;
    
    service.delete(enderecoId).subscribe();

    const req = httpMock.expectOne(`${service.API}/${enderecoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
