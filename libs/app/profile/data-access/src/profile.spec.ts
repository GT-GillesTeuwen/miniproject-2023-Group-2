import {ProfilesApi} from "./profiles.api";
import {IGetUserProfileRequest, IUpdateAccountDetailsResponse} from "@mp/api/profiles/util";
import firebase from "firebase/compat";
import HttpsCallableResult = firebase.functions.HttpsCallableResult;
import { HttpsCallable } from "firebase/functions";
// describe('Profile preview tests', () => {
  // let profile$: ProfilesApi;

  // let testUserRequest: IGetUserProfileRequest = {
  //   userId: 'testing',
  //   sessionId: 'testing'
  // };

  // it('Gets user profile from api', () => {
  //   expect(profile$?.getUserProfileDetails(testUserRequest)).toBe(Promise<HttpsCallableResult>)
  // })

  // testUserRequest = {
  //   userId: '',
  //   sessionId: 'testing'
  // };

  // it('Gets user profile from api with no userId', () => {
  //   expect(profile$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallable>)
  // })

  // testUserRequest = {
  //   userId: 'testing',
  //   sessionId: ''
  // };

  // it('Gets user profile from api with no sessionId', () => {
  //   expect(profile$?.getUserProfileDetails(testUserRequest) ).toBe(Promise<HttpsCallableResult>)
  // })

// })

