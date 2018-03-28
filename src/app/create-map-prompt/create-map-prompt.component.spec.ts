import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMapPromptComponent } from './create-map-prompt.component';

describe('CreateMapPromptComponent', () => {
  let component: CreateMapPromptComponent;
  let fixture: ComponentFixture<CreateMapPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMapPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMapPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
