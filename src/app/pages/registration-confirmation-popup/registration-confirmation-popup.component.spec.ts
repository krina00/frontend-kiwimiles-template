import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationConfirmationPopupComponent } from './registration-confirmation-popup.component';

describe('RegistrationConfirmationPopupComponent', () => {
  let component: RegistrationConfirmationPopupComponent;
  let fixture: ComponentFixture<RegistrationConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationConfirmationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
