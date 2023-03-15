import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiVsApiComponentComponent } from './ui-vs-api-component.component';

describe('UiVsApiComponentComponent', () => {
  let component: UiVsApiComponentComponent;
  let fixture: ComponentFixture<UiVsApiComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiVsApiComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiVsApiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
