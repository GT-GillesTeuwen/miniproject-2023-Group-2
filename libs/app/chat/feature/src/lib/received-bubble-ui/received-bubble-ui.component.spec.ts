import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedBubbleUiComponent } from './received-bubble-ui.component';

describe('ReceivedBubbleUiComponent', () => {
  let component: ReceivedBubbleUiComponent;
  let fixture: ComponentFixture<ReceivedBubbleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedBubbleUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedBubbleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
