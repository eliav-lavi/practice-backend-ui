import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingFlightsComponent } from './connecting-flights.component';

describe('ConnectingFlightsComponent', () => {
  let component: ConnectingFlightsComponent;
  let fixture: ComponentFixture<ConnectingFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectingFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectingFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
