import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SettingsPageComponent } from './settings-page.component';
import { of } from 'rxjs';
import { Store, NgxsModule } from '@ngxs/store';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let StoreMock: any;

  beforeEach(async () => {

    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    }


    await TestBed.configureTestingModule({
      declarations: [SettingsPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save current changes', () => {

    component.saveChanges();

    expect(component.initialVisibility).toBe('private')
    expect(component.lowerValue).toBe(16)
    expect(component.upperValue).toBe(50)
    expect(StoreMock.dispatch).toBeCalledTimes(1);

  });
});
