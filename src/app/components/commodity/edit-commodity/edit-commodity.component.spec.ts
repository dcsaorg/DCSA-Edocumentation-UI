import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommodityComponent } from './edit-commodity.component';

describe('EditCommodityComponent', () => {
  let component: EditCommodityComponent;
  let fixture: ComponentFixture<EditCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommodityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
