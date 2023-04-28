import { TestBed } from '@angular/core/testing';
import { ProfilesApi } from '../profiles.api';
import { doc, docData, Firestore, collection } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';

describe('DashboardPageComponent', () => {
  let api: ProfilesApi;
  let firestoreMock: any;
  let functionsMock: any;
  let sendPasswordResetEmailMock: jest.Mock;

  beforeEach(async () => {

    sendPasswordResetEmailMock = jest.fn();

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