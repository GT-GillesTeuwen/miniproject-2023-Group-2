import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStackContainerComponent } from './card-stack-container.component';

describe('CardStackContainerComponent', () => {
  let component: CardStackContainerComponent;
  let fixture: ComponentFixture<CardStackContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardStackContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardStackContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
