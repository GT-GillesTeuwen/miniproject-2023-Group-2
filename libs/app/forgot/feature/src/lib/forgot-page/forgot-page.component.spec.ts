import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ForgotPageComponent } from './forgot-page.component';

describe('ForgotPageComponent', () => {
  let component: ForgotPageComponent;
  let fixture: ComponentFixture<ForgotPageComponent>;
  let StoreMock: any;

  beforeEach(async () => {

    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    }


    await TestBed.configureTestingModule({
      declarations: [ForgotPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock},
      FormBuilder],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
