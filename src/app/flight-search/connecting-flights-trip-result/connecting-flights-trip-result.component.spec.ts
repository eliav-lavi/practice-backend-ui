import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingFlightsTripResultComponent } from './connecting-flights-trip-result.component';

describe('ConnectingFlightsTripResultComponent', () => {
  let component: ConnectingFlightsTripResultComponent;
  let fixture: ComponentFixture<ConnectingFlightsTripResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectingFlightsTripResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectingFlightsTripResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
