import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardItemComponent } from './card-item.component';
import { ElementRef } from '@angular/core';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;
  let WindowMock: any;
  let elementRegMock: any;

  beforeEach(async () => {

    WindowMock = {

    }

    elementRegMock = {

    }

    await TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      providers: [{provide: Window, useValue: WindowMock},
                  {privide: ElementRef, useValue: elementRegMock}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
