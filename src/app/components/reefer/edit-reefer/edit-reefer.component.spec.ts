import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReeferComponent } from './edit-reefer.component';

describe('EditReeferComponent', () => {
  let component: EditReeferComponent;
  let fixture: ComponentFixture<EditReeferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReeferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
