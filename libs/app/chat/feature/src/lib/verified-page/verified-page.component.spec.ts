import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { VerifiedPageComponent } from './verified-page.component';

describe('VerifiedPageComponent', () => {
  let component: VerifiedPageComponent;
  let fixture: ComponentFixture<VerifiedPageComponent>;
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
      declarations: [VerifiedPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock}, NavController, Router],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifiedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
