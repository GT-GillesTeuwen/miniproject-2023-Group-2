import { NotImplementedException } from '@nestjs/common';
import { CreateAuthCommand, ICreateAuthRequest, ResetAuthCommand, UpdateAuthCommand } from '@mp/api/auth/util';
import { ResetAuthHandler } from '../commands/reset-auth.handler';
import { CreateAuthHandler, UpdateAuthHandler } from '../commands';
import { Auth } from '../models';
import { EventPublisher } from '@nestjs/cqrs';
import { mock, when } from 'ts-mockito';
import { UserRecord } from 'firebase-admin/auth';
import { IAuth } from '@mp/api/auth/util';
import { Timestamp } from 'firebase-admin/firestore';


import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK

describe('AuthFeature', () => {
  let resetAuthHandler: ResetAuthHandler;
  let resetAuthCommand : ResetAuthCommand;
  let createAuthCommand : CreateAuthCommand;
  let createAuthHandler : CreateAuthHandler;
  let updateAuthCommand : UpdateAuthCommand;
  let UpdateAuthHandler : UpdateAuthHandler;
  // let event : Event;
  const eventPublisherMock = mock(EventPublisher);

  admin.initializeApp();

  

  const userRecord: admin.auth.UserRecord = {
    uid: '1',
    email: 'jan@gmail.com',
    displayName: 'Chadicus Maximus',
    emailVerified: true,
    disabled : false,
    metadata: {
      lastSignInTime: new Date().toISOString(),
      creationTime: new Date().toISOString(),
      toJSON: () => ({
        lastSignInTime: null,
        creationTime:null,
      }),
    },
    phoneNumber : "071694254",
    providerData: [],
    toJSON: () => ({})
  };

  const request : ICreateAuthRequest = {
    userRecord: userRecord
  };

  const data: IAuth = {
    id: "1",
    email: "jan@gmail.com",
    displayName: "Chadicus Maximus",
    photoURL: null,
    phoneNumber: "0716941254",
    customClaims: null,
    created: Timestamp.fromDate(new Date()),
  };

  const authInstance = new Auth(
    data.id,
    data.email,
    data.displayName,
    data.photoURL,
    data.phoneNumber,
    data.customClaims,
    data.created
  );


  when(eventPublisherMock.mergeObjectContext(Auth.fromData(data))).thenReturn(authInstance);

  




  beforeEach(() => {
    resetAuthHandler = new ResetAuthHandler();
    resetAuthCommand = new ResetAuthCommand();
     createAuthCommand  = new CreateAuthCommand(request);
     createAuthHandler = new CreateAuthHandler(eventPublisherMock);
  });

  describe('ResetAuth', () => {
    it('should work', async () => {

      
      expect(await resetAuthHandler.execute(resetAuthCommand)).toEqual(NotImplementedException);
    });
  });


  describe('CreateAuth', () => {
    it('should work', async () => {
 
      expect(await createAuthHandler.execute(createAuthCommand)).toEqual(NotImplementedException);
    });
  });
  
  describe('UpdateAuth', () => {
    it('should work', async () => {
      expect(await UpdateAuthHandler.execute(updateAuthCommand)).toEqual(NotImplementedException);
    });
  });

});
  

