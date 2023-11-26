import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetailsComponent } from './cliente-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClienteDetailsComponent', () => {
  let component: ClienteDetailsComponent;
  let fixture: ComponentFixture<ClienteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    
    fixture = TestBed.createComponent(ClienteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
