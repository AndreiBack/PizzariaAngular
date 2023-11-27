import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FuncionarioListComponent } from './funcionario-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario';
import { of } from 'rxjs';

describe('FuncionarioListComponent', () => {
  let component: FuncionarioListComponent;
  let fixture: ComponentFixture<FuncionarioListComponent>;
  let modalService: NgbModal;
  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => ({}) } },
        { provide: FuncionarioService, useValue: { listAll: () => of([]) } },
      ],
    });

    fixture = TestBed.createComponent(FuncionarioListComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    funcionarioService = TestBed.inject(FuncionarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.lista).toEqual([]);
    expect(component.FuncionarioSelecionadoParaEdicao).toBeDefined();
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });

  it('should call listAll() on construction', () => {
    spyOn(funcionarioService, 'listAll').and.returnValue(of([]));

    fixture = TestBed.createComponent(FuncionarioListComponent);
    component = fixture.componentInstance;

    expect(funcionarioService.listAll).toHaveBeenCalled();
  });

  it('should call adicionar() method successfully', () => {
    spyOn(modalService, 'open').and.callThrough();

    component.adicionar('modal');

    expect(component.FuncionarioSelecionadoParaEdicao).toEqual(new Funcionario());
    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });

});
