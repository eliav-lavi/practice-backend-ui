import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathsConfigurationModalComponent } from './paths-configuration-modal.component';

describe('PathsConfigurationModalComponent', () => {
  let component: PathsConfigurationModalComponent;
  let fixture: ComponentFixture<PathsConfigurationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathsConfigurationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathsConfigurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
