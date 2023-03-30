import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShipperPartyComponent } from './edit-shipper-party.component';

describe('EditShipperPartyComponent', () => {
  let component: EditShipperPartyComponent;
  let fixture: ComponentFixture<EditShipperPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShipperPartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShipperPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
