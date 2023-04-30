import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReceivedBubbleUiComponent } from './received-bubble-ui.component';

describe('ReceivedBubbleUiComponent', () => {
  let component: ReceivedBubbleUiComponent;
  let fixture: ComponentFixture<ReceivedBubbleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedBubbleUiComponent],
      imports: [NgxsModule.forRoot([])],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedBubbleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
