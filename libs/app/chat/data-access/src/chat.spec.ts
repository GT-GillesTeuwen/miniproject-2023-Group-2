import {ChatApi} from "./chat.api";
import {IGetUserProfileRequest, IUpdateAccountDetailsResponse} from "@mp/api/profiles/util";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import firebase from "firebase/compat";
import { collection, doc, docData, Firestore, getDocs } from '@angular/fire/firestore';
import HttpsCallableResult = firebase.functions.HttpsCallableResult;
describe('Profile preview tests', () => {
  let api: ChatApi;
  let functionsMock: any;
  let StoreMock: any;
  let FirestoreMock: any;

  //let testUserRequest: IGetUserProfileRequest = {
  //  userId: 'testing',
  //  sessionId: 'testing'
  //};

  beforeEach(async () => {

    functionsMock = {

    }
    StoreMock = {

    }
    FirestoreMock = {

    }


    TestBed.configureTestingModule({
      providers: [
        ChatApi,
        { provide: Store, useValue: StoreMock },
        { provide: Functions, useValue: functionsMock },
        { provide: Firestore, useValue: FirestoreMock },
      ],
    });
    api = TestBed.inject(ChatApi);
  });
  it('should create', () => {
    expect(api).toBeTruthy()
  })

  //it('Gets user profile from api', () => {
  //  expect(chat$?.getUserProfileDetails(testUserRequest)).toBe(Promise<HttpsCallableResult>)
  //})

  //testUserRequest = {
  //  userId: '',
  //  sessionId: 'testing'
  //};

  //it('Gets user profile from api with no userId', () => {
  //  expect(chat$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallableResult>)
  //})

  //testUserRequest = {
  //  userId: 'testing',
  //  sessionId: ''
  //};

  //it('Gets user profile from api with no sessionId', () => {
  //  expect(chat$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallableResult>)
  //})

})

