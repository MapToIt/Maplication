import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeProfileComponent } from './attendee-profile.component';

describe('AttendeeProfileComponent', () => {
  let component: AttendeeProfileComponent;
  let fixture: ComponentFixture<AttendeeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
