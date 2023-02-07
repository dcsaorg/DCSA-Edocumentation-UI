import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestedEquipmentComponent } from './edit-requested-equipment.component';

describe('EditRequestedEquipmentComponent', () => {
  let component: EditRequestedEquipmentComponent;
  let fixture: ComponentFixture<EditRequestedEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRequestedEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestedEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
