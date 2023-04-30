import { TestBed } from '@angular/core/testing';
import { FeedApi } from '../feed.api';
import {Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';

//describe('DashboardPageComponent', () => {
//  let api: FeedApi;
//  let firestoreMock: any;
//  let functionsMock: any;
//
//  beforeEach(async () => {
//
//    firestoreMock = {
//    };
//
//    functionsMock = {
//    };
//
//
//    TestBed.configureTestingModule({
//      providers: [
//        FeedApi,
//        { provide: Firestore, useValue: firestoreMock },
//        { provide: Functions, useValue: functionsMock },
//      ],
//    });
//    api = TestBed.inject(FeedApi);
//  });
//
//  it('should create', () => {
//    expect(api).toBeTruthy();
//  });
//
//}); 