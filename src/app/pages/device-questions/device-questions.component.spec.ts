import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceQuestionsComponent } from './device-questions.component';

describe('DeviceQuestionsComponent', () => {
  let component: DeviceQuestionsComponent;
  let fixture: ComponentFixture<DeviceQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
