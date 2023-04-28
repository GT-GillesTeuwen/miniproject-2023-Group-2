import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentBubbleUiComponent } from './sent-bubble-ui.component';

describe('SentBubbleUiComponent', () => {
  let component: SentBubbleUiComponent;
  let fixture: ComponentFixture<SentBubbleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentBubbleUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SentBubbleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
