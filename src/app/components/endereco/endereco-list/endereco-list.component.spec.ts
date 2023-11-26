import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoListComponent } from './endereco-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EnderecoListComponent', () => {
  let component: EnderecoListComponent;
  let fixture: ComponentFixture<EnderecoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(EnderecoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
