import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClienteListComponent } from './cliente-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { of, throwError } from 'rxjs';

describe('ClienteListComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;
  let modalService: NgbModal;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => ({}) } },
        { provide: ClienteService, useValue: { listAll: () => of([]) } },
      ],
    });

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    clienteService = TestBed.inject(ClienteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.lista).toEqual([]);
    expect(component.modoLancamento).toBeFalse();
    expect(component.ClienteSelecionadoParaEdicao).toBeDefined();
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });

  it('should call listAll() on construction', () => {
    spyOn(clienteService, 'listAll').and.returnValue(of([]));

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;

    expect(clienteService.listAll).toHaveBeenCalled();
  });

  it('should call adicionar() method successfully', () => {
    spyOn(modalService, 'open').and.callThrough();

    component.adicionar('modal');

    expect(component.ClienteSelecionadoParaEdicao).toEqual(new Cliente());
    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });



});
