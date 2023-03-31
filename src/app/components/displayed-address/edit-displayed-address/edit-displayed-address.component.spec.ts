import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisplayedAddressComponent } from './edit-displayed-address.component';

describe('EditDisplayedAddressComponent', () => {
  let component: EditDisplayedAddressComponent;
  let fixture: ComponentFixture<EditDisplayedAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisplayedAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDisplayedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
