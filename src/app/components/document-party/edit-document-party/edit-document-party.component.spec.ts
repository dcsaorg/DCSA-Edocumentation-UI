import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentPartyComponent } from './edit-document-party.component';

describe('EditDocumentPartyComponent', () => {
  let component: EditDocumentPartyComponent;
  let fixture: ComponentFixture<EditDocumentPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDocumentPartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDocumentPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
