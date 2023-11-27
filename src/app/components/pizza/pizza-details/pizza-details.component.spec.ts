import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PizzaDetailsComponent } from './pizza-details.component';
import { Pizza } from 'src/app/models/pizza';
import { Sabor } from 'src/app/models/sabor';
import { PizzaService } from 'src/app/services/pizza.service';
import { of } from 'rxjs';

describe('PizzaDetailsComponent', () => {
  let component: PizzaDetailsComponent;
  let fixture: ComponentFixture<PizzaDetailsComponent>;
  let pizzaService: PizzaService;
  let modalService: NgbModal;
  let mockModalRef: NgbModalRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => mockModalRef } },
        { provide: PizzaService, useValue: { update: () => of(new Pizza()), save: () => of(new Pizza()), delete: () => of(null) } },
      ],
    });

    fixture = TestBed.createComponent(PizzaDetailsComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.inject(PizzaService);
    modalService = TestBed.inject(NgbModal);
    mockModalRef = {} as NgbModalRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.pizza).toEqual(new Pizza());
    expect(component.isEdit).toBeFalsy();
    expect(component.modalRef).toBeUndefined();
  });

  it('should call ngOnInit() method successfully', () => {
    component.pizza.id = 1;

    component.ngOnInit();

    expect(component.isEdit).toBeTruthy();
  });

  it('should call salvar() method for editing', fakeAsync(() => {
    component.isEdit = true;
    spyOn(pizzaService, 'update').and.returnValue(of(new Pizza()));
    spyOn(component.retorno, 'emit');

    component.salvar();
    tick(); // needed for the observable to complete

    expect(pizzaService.update).toHaveBeenCalledWith(component.pizza);
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  it('should call salvar() method for adding with success', fakeAsync(() => {
    component.isEdit = false;
    spyOn(pizzaService, 'save').and.returnValue(of(new Pizza()));
    spyOn(component.retorno, 'emit');

    component.salvar();
    tick(); // needed for the observable to complete

    expect(pizzaService.save).toHaveBeenCalledWith(component.pizza);
    expect(component.retorno.emit).toHaveBeenCalled();
  }));



});
