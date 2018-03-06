import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListViewComponent } from './event-list-view.component';
import { Event } from '../common/event';

describe('EventListViewComponent', () => {
  let component: EventListViewComponent;
  let fixture: ComponentFixture<EventListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
