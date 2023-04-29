import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { ProfileCardPageComponent } from './profile-card-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ProfileCardPageComponent', () => {
  let component: ProfileCardPageComponent;
  let fixture: ComponentFixture<ProfileCardPageComponent>;
  let StoreMock: any;

  beforeEach(async () => {
    

    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ProfileCardPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCardPageComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
