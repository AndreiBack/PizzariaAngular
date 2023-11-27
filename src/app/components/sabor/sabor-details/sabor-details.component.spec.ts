import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SaborDetailsComponent } from './sabor-details.component';
import { Sabor } from 'src/app/models/sabor';

describe('SaborDetailsComponent', () => {
  let component: SaborDetailsComponent;
  let fixture: ComponentFixture<SaborDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaborDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SaborDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default Sabor instance', () => {
    expect(component.sabor).toBeDefined();
    expect(component.sabor instanceof Sabor).toBeTruthy();
  });

  it('should set isEdit to true when sabor id is greater than 0', () => {
    component.sabor.id = 1;
    component.ngOnInit();
    expect(component.isEdit).toBeTrue();
  });

  it('should set isEdit to false when sabor id is 0', () => {
    component.sabor.id = 0;
    component.ngOnInit();
    expect(component.isEdit).toBeFalse();
  });


});
