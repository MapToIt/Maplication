import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordHomeComponent } from './coord-home.component';

describe('CoordHomeComponent', () => {
  let component: CoordHomeComponent;
  let fixture: ComponentFixture<CoordHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
