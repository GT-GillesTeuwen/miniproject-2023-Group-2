import { TestBed } from '@angular/core/testing';
import { AuthApi } from '../auth.api';
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
  let api: AuthApi;
  let authMock: any;
  let functionsMock: any;
  let sendPasswordResetEmailMock: jest.Mock;

  beforeEach(async () => {

    sendPasswordResetEmailMock = jest.fn();

    authMock = {
    };

    functionsMock = {
    };


    TestBed.configureTestingModule({
      providers: [
        AuthApi,
        { provide: Auth, useValue: authMock },
        { provide: Functions, useValue: functionsMock },
        { provide: sendPasswordResetEmail, useValue: sendPasswordResetEmailMock },
      ],
    });
    api = TestBed.inject(AuthApi);
  });

  it('should create', () => {
    expect(api).toBeTruthy();
  });

}); 