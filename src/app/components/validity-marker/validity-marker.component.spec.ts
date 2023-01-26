import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityMarkerComponent } from './validity-marker.component';

describe('ValidityMarkerComponent', () => {
  let component: ValidityMarkerComponent;
  let fixture: ComponentFixture<ValidityMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidityMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidityMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
