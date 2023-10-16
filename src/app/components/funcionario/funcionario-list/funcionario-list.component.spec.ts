import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioListComponent } from './funcionario-list.component';

describe('FuncionarioListComponent', () => {
  let component: FuncionarioListComponent;
  let fixture: ComponentFixture<FuncionarioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioListComponent]
    });
    fixture = TestBed.createComponent(FuncionarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
