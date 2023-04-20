import {ChatApi} from "./chat.api";
import {IGetUserProfileRequest, IUpdateAccountDetailsResponse} from "@mp/api/profiles/util";
import firebase from "firebase/compat";
import HttpsCallableResult = firebase.functions.HttpsCallableResult;
describe('Profile preview tests', () => {
  let chat$: ChatApi;

  let testUserRequest: IGetUserProfileRequest = {
    userId: 'testing',
    sessionId: 'testing'
  };

  it('Gets user profile from api', () => {
    expect(chat$?.getUserProfileDetails(testUserRequest)).toBe(Promise<HttpsCallableResult>)
  })

  testUserRequest = {
    userId: '',
    sessionId: 'testing'
  };

  it('Gets user profile from api with no userId', () => {
    expect(chat$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallableResult>)
  })

  testUserRequest = {
    userId: 'testing',
    sessionId: ''
  };

  it('Gets user profile from api with no sessionId', () => {
    expect(chat$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallableResult>)
  })

})

