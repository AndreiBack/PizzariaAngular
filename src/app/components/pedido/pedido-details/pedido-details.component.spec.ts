import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetailsComponent } from './pedido-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PedidoDetailsComponent', () => {
  let component: PedidoDetailsComponent;
  let fixture: ComponentFixture<PedidoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(PedidoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
