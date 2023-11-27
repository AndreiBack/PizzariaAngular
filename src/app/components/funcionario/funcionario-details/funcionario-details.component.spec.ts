import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FuncionarioDetailsComponent } from './funcionario-details.component';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { of } from 'rxjs';

describe('FuncionarioDetailsComponent', () => {
  let component: FuncionarioDetailsComponent;
  let fixture: ComponentFixture<FuncionarioDetailsComponent>;
  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: FuncionarioService, useValue: { update: () => of(new Funcionario()), save: () => of(new Funcionario()) } },
      ],
    });
    fixture = TestBed.createComponent(FuncionarioDetailsComponent);
    component = fixture.componentInstance;
    funcionarioService = TestBed.inject(FuncionarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.funcionario).toEqual(new Funcionario());
    expect(component.isEdit).toBeFalse();
  });

  it('should set isEdit to true in ngOnInit when funcionario has id', () => {
    component.funcionario.id = 1;

    component.ngOnInit();

    expect(component.isEdit).toBeTrue();
  });

  it('should call salvar() method with isEdit as true', () => {
    spyOn(funcionarioService, 'update').and.returnValue(of(new Funcionario()));
    spyOn(component.retorno, 'emit');

    component.isEdit = true;
    component.funcionario.id = 1;

    component.salvar();

    expect(funcionarioService.update).toHaveBeenCalledWith(component.funcionario);
    expect(component.retorno.emit).toHaveBeenCalled();
  });

  it('should call salvar() method with isEdit as false', () => {
    spyOn(funcionarioService, 'save').and.returnValue(of(new Funcionario()));
    spyOn(component.retorno, 'emit');

    component.isEdit = false;

    component.salvar();

    expect(funcionarioService.save).toHaveBeenCalledWith(component.funcionario);
    expect(component.retorno.emit).toHaveBeenCalled();
  });
});
