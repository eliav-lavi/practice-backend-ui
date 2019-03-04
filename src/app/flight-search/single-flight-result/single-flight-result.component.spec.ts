import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFlightResultComponent } from './single-flight-result.component';

describe('SingleFlightResultComponent', () => {
  let component: SingleFlightResultComponent;
  let fixture: ComponentFixture<SingleFlightResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFlightResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFlightResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
