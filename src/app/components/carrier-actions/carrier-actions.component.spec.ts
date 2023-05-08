import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierActionsComponent } from './carrier-actions.component';

describe('CarrierActionsComponent', () => {
  let component: CarrierActionsComponent;
  let fixture: ComponentFixture<CarrierActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
