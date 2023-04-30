import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReceivedEmojiUiComponent } from './received-emoji-ui.component';

describe('ReceivedEmojiUiComponent', () => {
  let component: ReceivedEmojiUiComponent;
  let fixture: ComponentFixture<ReceivedEmojiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedEmojiUiComponent],
      imports: [NgxsModule.forRoot([])],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedEmojiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
