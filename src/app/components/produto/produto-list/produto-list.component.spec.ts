import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoListComponent } from './produto-list.component';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { of } from 'rxjs';

describe('ProdutoListComponent', () => {
  let component: ProdutoListComponent;
  let fixture: ComponentFixture<ProdutoListComponent>;
  let produtoService: ProdutoService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProdutoService, useValue: { listAll: () => of([]), exemploErro: () => of([]), delete: () => of({}) } },
        { provide: NgbModal, useValue: { open: () => ({}) } },
      ],
    });

    fixture = TestBed.createComponent(ProdutoListComponent);
    component = fixture.componentInstance;
    produtoService = TestBed.inject(ProdutoService);
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.lista).toEqual([]);
    expect(component.retorno).toBeDefined();
    expect(component.modoLancamento).toBeFalsy();
    expect(component.ProdutoSelecionadoParaEdicao).toEqual(new Produto());
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });

  it('should call exemploErro() successfully', fakeAsync(() => {
    spyOn(produtoService, 'exemploErro').and.returnValue(of([]));

    component.exemploErro();
    tick(); // needed for the observable to complete

    expect(produtoService.exemploErro).toHaveBeenCalled();
    expect(component.lista).toEqual([]);
  }));

  it('should not call excluir() method when canceling confirmation', fakeAsync(() => {
    spyOn(produtoService, 'delete');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(console, 'error');

    component.excluir(1);
    tick(); // needed for the observable to complete

    expect(produtoService.delete).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  }));
});
