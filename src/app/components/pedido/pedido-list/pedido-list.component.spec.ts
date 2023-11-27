import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoListComponent } from './pedido-list.component';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { of } from 'rxjs';

describe('PedidoListComponent', () => {
  let component: PedidoListComponent;
  let fixture: ComponentFixture<PedidoListComponent>;
  let pedidoService: PedidoService;
  let modalService: NgbModal;
  let mockModalRef: NgbModalRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => mockModalRef } },
        { provide: PedidoService, useValue: { listAll: () => of([]), exemploErro: () => of([]), delete: () => of(null) } },
      ],
    });

    fixture = TestBed.createComponent(PedidoListComponent);
    component = fixture.componentInstance;
    pedidoService = TestBed.inject(PedidoService);
    modalService = TestBed.inject(NgbModal);
    mockModalRef = {} as NgbModalRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.lista).toEqual([]);
    expect(component.PedidoSelecionadoParaEdicao).toEqual(new Pedido());
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });


  it('should call exemploErro() method successfully', () => {
    spyOn(pedidoService, 'exemploErro').and.returnValue(of([]));

    component.exemploErro();

    expect(pedidoService.exemploErro).toHaveBeenCalled();
  });

  it('should call adicionar() method successfully', () => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);

    component.adicionar('modal');

    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });


 

});
