import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioListComponent } from './funcionario-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FuncionarioListComponent', () => {
  let component: FuncionarioListComponent;
  let fixture: ComponentFixture<FuncionarioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioListComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FuncionarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
