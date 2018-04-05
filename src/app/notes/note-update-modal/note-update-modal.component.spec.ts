import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteUpdateModalComponent } from './note-update-modal.component';

describe('NoteUpdateModalComponent', () => {
  let component: NoteUpdateModalComponent;
  let fixture: ComponentFixture<NoteUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
