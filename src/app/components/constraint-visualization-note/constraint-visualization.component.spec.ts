import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintVisualizationComponent } from './constraint-visualization.component';

describe('UiOnlyNoteComponent', () => {
  let component: ConstraintVisualizationComponent;
  let fixture: ComponentFixture<ConstraintVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstraintVisualizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstraintVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
