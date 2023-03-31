import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartyContactDetailsComponent } from './edit-party-contact-details.component';

describe('EditPartyContactDetailsComponent', () => {
  let component: EditPartyContactDetailsComponent;
  let fixture: ComponentFixture<EditPartyContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartyContactDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPartyContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
