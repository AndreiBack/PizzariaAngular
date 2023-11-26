import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoListComponent } from './pedido-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PedidoListComponent', () => {
  let component: PedidoListComponent;
  let fixture: ComponentFixture<PedidoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoListComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(PedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
