import { TestBed } from '@angular/core/testing';
import { ProfilesApi } from '../profiles.api';
import {Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';

describe('DashboardPageComponent', () => {
  let api: ProfilesApi;
  let firestoreMock: any;
  let functionsMock: any;

  beforeEach(async () => {

    firestoreMock = {
    };

    functionsMock = {
    };


    TestBed.configureTestingModule({
      providers: [
        ProfilesApi,
        { provide: Firestore, useValue: firestoreMock },
        { provide: Functions, useValue: functionsMock },
      ],
    });
    api = TestBed.inject(ProfilesApi);
  });

  it('should create', () => {
    expect(api).toBeTruthy();
  });

}); 