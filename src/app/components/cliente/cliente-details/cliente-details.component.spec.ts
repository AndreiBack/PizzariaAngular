import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetailsComponent } from './cliente-details.component';

describe('ClienteDetailsComponent', () => {
  let component: ClienteDetailsComponent;
  let fixture: ComponentFixture<ClienteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetailsComponent]
    });
    fixture = TestBed.createComponent(ClienteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
