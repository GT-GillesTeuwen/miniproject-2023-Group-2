import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentEmojiUiComponent } from './sent-emoji-ui.component';

describe('SentEmojiUiComponent', () => {
  let component: SentEmojiUiComponent;
  let fixture: ComponentFixture<SentEmojiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentEmojiUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SentEmojiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
