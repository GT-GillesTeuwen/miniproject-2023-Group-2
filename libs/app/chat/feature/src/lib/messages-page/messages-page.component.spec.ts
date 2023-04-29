import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Store, NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MessagesPageComponent } from './messages-page.component';

describe('MessagesPageComponent', () => {
  let component: MessagesPageComponent;
  let fixture: ComponentFixture<MessagesPageComponent>;
  let StoreMock: any;
  let ActivatedRouteMock: any;

  beforeEach(async () => {

    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    };

    ActivatedRouteMock = {
      paramMap: of(convertToParamMap({ id: '123' })),
    };

    await TestBed.configureTestingModule({
      declarations: [MessagesPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock}, NavController, Router],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
