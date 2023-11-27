import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoDetailsComponent } from './pedido-details.component';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { of } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Funcionario } from 'src/app/models/funcionario';
import { Pizza } from 'src/app/models/pizza';
import { Produto } from 'src/app/models/produto';

describe('PedidoDetailsComponent', () => {
  let component: PedidoDetailsComponent;
  let fixture: ComponentFixture<PedidoDetailsComponent>;
  let pedidoService: PedidoService;
  let clienteService: ClienteService;
  let funcionarioService: FuncionarioService;
  let modalService: NgbModal;
  let mockModalRef: NgbModalRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => mockModalRef } },
        { provide: PedidoService, useValue: { update: () => of(new Pedido()), save: () => of(new Pedido()) } },
        { provide: ClienteService, useValue: { listAll: () => of([]) } },
        { provide: FuncionarioService, useValue: { listAll: () => of([]) } },
      ],
    });

    fixture = TestBed.createComponent(PedidoDetailsComponent);
    component = fixture.componentInstance;
    pedidoService = TestBed.inject(PedidoService);
    clienteService = TestBed.inject(ClienteService);
    funcionarioService = TestBed.inject(FuncionarioService);
    modalService = TestBed.inject(NgbModal);
    mockModalRef = {} as NgbModalRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.pedido).toEqual(new Pedido());
    expect(component.isEdit).toBeFalse();
    expect(component.clientes).toEqual([]);
    expect(component.funcionarios).toEqual([]);
    expect(component.modalRef).toBeUndefined();
  });

  it('should set isEdit to true in ngOnInit when pedido has id', () => {
    component.pedido.id = 1;

    component.ngOnInit();

    expect(component.isEdit).toBeTrue();
  });

  it('should call listAll() for clientes and funcionarios on ngOnInit', () => {
    spyOn(clienteService, 'listAll').and.returnValue(of([]));
    spyOn(funcionarioService, 'listAll').and.returnValue(of([]));

    component.ngOnInit();

    expect(clienteService.listAll).toHaveBeenCalled();
    expect(funcionarioService.listAll).toHaveBeenCalled();
  });

  it('should call salvar() method with isEdit as true', fakeAsync(() => {
    spyOn(pedidoService, 'update').and.returnValue(of(new Pedido()));
    spyOn(component.retorno, 'emit');

    component.isEdit = true;
    component.pedido.id = 1;

    component.salvar();
    tick(); // needed for the observable to complete

    expect(pedidoService.update).toHaveBeenCalledWith(component.pedido);
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  it('should call salvar() method with isEdit as false', fakeAsync(() => {
    spyOn(pedidoService, 'save').and.returnValue(of(new Pedido()));
    spyOn(component.retorno, 'emit');

    component.isEdit = false;

    component.salvar();
    tick();

    expect(pedidoService.save).toHaveBeenCalledWith(component.pedido);
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  it('should call excluirPizza() method successfully', () => {
    const pizza = new Pizza();
    const indice = 0;

    component.pedido.pizzas = [new Pizza(), new Pizza()];

    component.excluirPizza(pizza, indice);

    expect(component.pedido.pizzas.length).toBe(1);
  });

  it('should call excluirProduto() method successfully', () => {
    const produto = new Produto();
    const indice = 0;

    component.pedido.produtos = [new Produto(), new Produto()];

    component.excluirProduto(produto, indice);

    expect(component.pedido.produtos.length).toBe(1);
  });

  it('should call lancar() method successfully', () => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);

    component.lancar('modal');

    expect(modalService.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });
});
