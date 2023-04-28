import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { CardStackContainerComponent } from './card-stack-container.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IMatchDetails, IProfile } from '@mp/api/profiles/util';
import { IAgeRange } from '@mp/api/profiles/util';

describe('CardStackContainerComponent', () => {
  let component: CardStackContainerComponent;
  let fixture: ComponentFixture<CardStackContainerComponent>;
  let StoreMock: any;

  beforeEach(async () => {
    
    StoreMock = {
      subscribe: jest.fn(),
      select: () => of({}),
      dispatch: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [CardStackContainerComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{provide: Store, useValue: StoreMock}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardStackContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be in range', () => {
    const range: IAgeRange = {
      MinAge: 10,
      MaxAge: 50 
    }

    expect(component.isInRange('12', range)).toBe(true);


  });

  it('should be smaller than range', () => {
    const range: IAgeRange = {
      MinAge: 10,
      MaxAge: 50 
    }

    expect(component.isInRange('9', range)).toBe(false);


  });

  it('should be bigger than range', () => {
    const range: IAgeRange = {
      MinAge: 10,
      MaxAge: 50 
    }

    expect(component.isInRange('51', range)).toBe(false);


  });

  it('should return SEND', () => {

    const match: IMatchDetails = {
      MatchUserID: '12',
      PairID: '123',
      MatchStatus: 'SEND'
    };

    const profile: IProfile = {
      UID: '123',
      Matches: [match]
    };

    expect(component.getMatchStatus(profile, '12')).toBe('SEND');

  });

  it('should return REMOVE', () => {

    const match: IMatchDetails = {
      MatchUserID: '12',
      PairID: '123',
      MatchStatus: 'REMOVE'
    };

    const profile: IProfile = {
      UID: '123',
      Matches: [match]
    };

    expect(component.getMatchStatus(profile, '12')).toBe('REMOVE');

  });

  it('should return PAIR', () => {

    const match: IMatchDetails = {
      MatchUserID: '12',
      PairID: '123',
      MatchStatus: 'PAIR'
    };

    const profile: IProfile = {
      UID: '123',
      Matches: [match]
    };

    expect(component.getMatchStatus(profile, '12')).toBe('PAIR');

  });

  it('should match user where the other user did not match', () => {

    component.currentUserID = '123'
    const match: IMatchDetails = {
      MatchUserID: '12',
      PairID: '123',
      MatchStatus: 'SENT'
    }

    component.profilesToShow[0] = {
      UID: '123',
      Matches: [match]
    }

    component.matchUsers(true);

    expect(StoreMock.dispatch).toHaveBeenCalledTimes(4);

  });

  it('should match user where the other user did match', () => {

    component.currentUserID = '123'
    const match: IMatchDetails = {
      MatchUserID: '123',
      PairID: '12343',
      MatchStatus: 'SEND'
    }

    component.profilesToShow[0] = {
      UID: '123',
      Matches: [match]
    }

    component.matchUsers(true);

    expect(StoreMock.dispatch).toHaveBeenCalledTimes(4);

  });

  it('should remove user that the curr user swipe left on and the other user did not like me', () => {

    component.currentUserID = '123'
    const match: IMatchDetails = {
      MatchUserID: '12',
      PairID: '12343',
      MatchStatus: 'RECIEVE'
    }

    component.profilesToShow[0] = {
      UID: '123',
      Matches: [match]
    }

    component.matchUsers(false);

    expect(StoreMock.dispatch).toHaveBeenCalledTimes(3);

  });

  it('should remove user that the curr user swipe left on and the other user did like me', () => {

    component.currentUserID = '123'
    const match: IMatchDetails = {
      MatchUserID: '123',
      PairID: '1',
      MatchStatus: 'REMOVE'
    }

    component.profilesToShow[0] = {
      UID: '123',
      Matches: [match]
    }

    component.matchUsers(false);

    expect(StoreMock.dispatch).toHaveBeenCalledTimes(4);

  });
});
