import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPaymentComponent } from './load-payment.component';

describe('LoadPaymentComponent', () => {
  let component: LoadPaymentComponent;
  let fixture: ComponentFixture<LoadPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadPaymentComponent]
    });
    fixture = TestBed.createComponent(LoadPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
