import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoDetailsComponent } from './endereco-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EnderecoDetailsComponent', () => {
  let component: EnderecoDetailsComponent;
  let fixture: ComponentFixture<EnderecoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(EnderecoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
