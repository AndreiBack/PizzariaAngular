import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClienteDetailsComponent } from './cliente-details.component';
import { Cliente } from 'src/app/models/cliente';
import { Endereco } from 'src/app/models/endereco';

describe('ClienteDetailsComponent', () => {
  let component: ClienteDetailsComponent;
  let fixture: ComponentFixture<ClienteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ClienteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have @Input() cliente property', () => {
    const cliente = new Cliente();
    component.cliente = cliente;
    expect(component.cliente).toBe(cliente);
  });

  it('should have @Output() retorno property', () => {
    expect(component.retorno).toBeTruthy();
  });

  it('should have isEdit property initialized to false in ngOnInit', () => {
    component.ngOnInit();
    expect(component.isEdit).toBeFalse();
  });


  it('should have ClienteService property clienteService', () => {
    expect(component.clienteService).toBeDefined();
  });


  it('should call excluir() method successfully', () => {
    const endereco = new Endereco();
    const indice = 0;
    component.cliente.endereco = [endereco];

    component.excluir(endereco, indice);

    expect(component.cliente.endereco.length).toBe(0);
  });



  it('should call lancar() method successfully', () => {
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);
    component.modalService = modalServiceSpy;

    component.lancar('modal');

    expect(modalServiceSpy.open).toHaveBeenCalledWith('modal', { size: 'lg' });
  });
});
