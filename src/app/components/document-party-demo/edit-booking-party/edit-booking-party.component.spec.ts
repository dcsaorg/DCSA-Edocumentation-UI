import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingPartyComponent } from './edit-booking-party.component';

describe('EditBookingPartyComponent', () => {
  let component: EditBookingPartyComponent;
  let fixture: ComponentFixture<EditBookingPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookingPartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
