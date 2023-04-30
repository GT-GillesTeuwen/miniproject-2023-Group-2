import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatchesPageComponent } from './matches-page.component';
import { of } from 'rxjs';
import { Store, NgxsModule } from '@ngxs/store';

describe('MatchesPageComponent', () => {
  let component: MatchesPageComponent;
  let fixture: ComponentFixture<MatchesPageComponent>;
  let StoreMock: any;

  beforeEach(async () => {

    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [MatchesPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
