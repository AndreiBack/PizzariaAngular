import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaListComponent } from './pizza-list.component';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { of } from 'rxjs';

describe('PizzaListComponent', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;
  let pizzaService: PizzaService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => ({}) } },
        { provide: PizzaService, useValue: { listAll: () => of([]), exemploErro: () => of([]), delete: () => of(null) } },
      ],
    });

    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.inject(PizzaService);
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
    expect(component.PizzaSelecionadoParaEdicao).toEqual(new Pizza());
    expect(component.indiceSelecionadoParaEdicao).toBeUndefined();
  });

  it('should call listAll() method successfully', fakeAsync(() => {
    spyOn(pizzaService, 'listAll').and.returnValue(of([]));

    component.listAll();
    tick(); // needed for the observable to complete

    expect(pizzaService.listAll).toHaveBeenCalled();
    expect(component.lista).toEqual([]);
  }));

  it('should call exemploErro() method successfully', fakeAsync(() => {
    spyOn(pizzaService, 'exemploErro').and.returnValue(of([]));

    component.exemploErro();
    tick(); // needed for the observable to complete

    expect(pizzaService.exemploErro).toHaveBeenCalled();
    expect(component.lista).toEqual([]);
  }));

  it('should call adicionar() method successfully', () => {
    spyOn(modalService, 'open');

    component.adicionar('modal');

    expect(component.PizzaSelecionadoParaEdicao).toEqual(new Pizza());
    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });

  it('should not call excluir() method when user cancels', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(pizzaService, 'delete');

    component.excluir(1);
    tick(); // needed for the observable to complete

    expect(window.confirm).toHaveBeenCalled();
    expect(pizzaService.delete).not.toHaveBeenCalled();
  }));

  it('should call lancamento() method successfully', () => {
    spyOn(component.retorno, 'emit');

    component.lancamento(new Pizza());

    expect(component.retorno.emit).toHaveBeenCalled();
  });
});
