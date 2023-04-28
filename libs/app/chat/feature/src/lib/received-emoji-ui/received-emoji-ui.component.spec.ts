import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedEmojiUiComponent } from './received-emoji-ui.component';

describe('ReceivedEmojiUiComponent', () => {
  let component: ReceivedEmojiUiComponent;
  let fixture: ComponentFixture<ReceivedEmojiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedEmojiUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedEmojiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
