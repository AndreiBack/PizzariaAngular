import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnderecoDetailsComponent } from './endereco-details.component';
import { Endereco } from 'src/app/models/endereco';
import { EnderecoService } from 'src/app/services/endereco.service';
import { of, throwError } from 'rxjs';

describe('EnderecoDetailsComponent', () => {
  let component: EnderecoDetailsComponent;
  let fixture: ComponentFixture<EnderecoDetailsComponent>;
  let enderecoService: EnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: EnderecoService, useValue: { update: () => of(new Endereco()), save: () => of(new Endereco()) } },
      ],
    });
    fixture = TestBed.createComponent(EnderecoDetailsComponent);
    component = fixture.componentInstance;
    enderecoService = TestBed.inject(EnderecoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.endereco).toEqual(new Endereco());
    expect(component.isEdit).toBeFalse();
  });

  it('should set isEdit to true in ngOnInit when endereco has id', () => {
    component.endereco.id = 1;

    component.ngOnInit();

    expect(component.isEdit).toBeTrue();
  });

  it('should call salvar() method with isEdit as true', () => {
    spyOn(enderecoService, 'update').and.returnValue(of(new Endereco()));
    spyOn(component.retorno, 'emit');

    component.isEdit = true;
    component.endereco.id = 1;

    component.salvar();

    expect(enderecoService.update).toHaveBeenCalledWith(component.endereco);
    expect(component.retorno.emit).toHaveBeenCalled();
  });

  it('should call salvar() method with isEdit as false', () => {
    spyOn(enderecoService, 'save').and.returnValue(of(new Endereco()));
    spyOn(component.retorno, 'emit');

    component.isEdit = false;

    component.salvar();

    expect(enderecoService.save).toHaveBeenCalledWith(component.endereco);
    expect(component.retorno.emit).toHaveBeenCalled();
  });
});
