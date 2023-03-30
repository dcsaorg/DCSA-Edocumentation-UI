import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPartyDemoComponent } from './document-party-demo.component';

describe('DocumentPartyDemoComponent', () => {
  let component: DocumentPartyDemoComponent;
  let fixture: ComponentFixture<DocumentPartyDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPartyDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPartyDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
