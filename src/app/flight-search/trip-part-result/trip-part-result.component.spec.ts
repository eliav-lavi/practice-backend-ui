import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPartResultComponent } from './trip-part-result.component';

describe('TripPartResultComponent', () => {
  let component: TripPartResultComponent;
  let fixture: ComponentFixture<TripPartResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripPartResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPartResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
