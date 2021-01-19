import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormarraydeviceComponent } from './formarraydevice.component';

describe('FormarraydeviceComponent', () => {
  let component: FormarraydeviceComponent;
  let fixture: ComponentFixture<FormarraydeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormarraydeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormarraydeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
