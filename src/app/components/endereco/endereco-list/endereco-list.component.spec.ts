import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnderecoListComponent } from './endereco-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Endereco } from 'src/app/models/endereco';
import { of } from 'rxjs';

describe('EnderecoListComponent', () => {
  let component: EnderecoListComponent;
  let fixture: ComponentFixture<EnderecoListComponent>;
  let modalService: NgbModal;
  let enderecoService: EnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => ({}) } },
        { provide: EnderecoService, useValue: { listAll: () => of([]) } },
      ],
    });

    fixture = TestBed.createComponent(EnderecoListComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    enderecoService = TestBed.inject(EnderecoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.lista).toEqual([]);
    expect(component.modoLancamento).toBeFalse();
    expect(component.EnderecoSelecionadoParaEdicao).toBeDefined();
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });

  it('should call listAll() on construction', () => {
    spyOn(enderecoService, 'listAll').and.returnValue(of([]));

    fixture = TestBed.createComponent(EnderecoListComponent);
    component = fixture.componentInstance;

    expect(enderecoService.listAll).toHaveBeenCalled();
  });

  it('should call adicionar() method successfully', () => {
    spyOn(modalService, 'open').and.callThrough();

    component.adicionar('modal');

    expect(component.EnderecoSelecionadoParaEdicao).toEqual(new Endereco());
    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });


  it('should call lancamento() method successfully', () => {
    const endereco = new Endereco();
    spyOn(component.retorno, 'emit');

    component.lancamento(endereco);

    expect(component.retorno.emit).toHaveBeenCalledWith(endereco);
  });
});