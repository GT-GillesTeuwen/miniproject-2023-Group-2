import { NotImplementedException } from '@nestjs/common';
import { CreateAuthCommand, ICreateAuthRequest, IUpdateAuthRequest, ResetAuthCommand, UpdateAuthCommand } from '@mp/api/auth/util';
import { ResetAuthHandler } from '../commands/reset-auth.handler';
import { CreateAuthHandler, UpdateAuthHandler } from '../commands';
import { Auth } from '../models';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { mock, when,instance } from 'ts-mockito';
import { IAuth } from '@mp/api/auth/util';
import { Timestamp } from 'firebase-admin/firestore';
import { Test, TestingModule } from '@nestjs/testing';
import { Module } from '@nestjs/common';
import { AuthModule as AuthDataAccessModule } from '@mp/api/auth/data-access';



import * as admin from 'firebase-admin';


// Initialize Firebase Admin SDK

describe('AuthFeature', () => {
  let resetAuthHandler: ResetAuthHandler;
  let resetAuthCommand : ResetAuthCommand;
  let createAuthHandler : CreateAuthHandler;
  let updateAuthCommand : UpdateAuthCommand;
  let updateAuthHandler : UpdateAuthHandler;
  // let event : Event;
  const eventPublisherMock = mock(EventPublisher);

  admin.initializeApp();
  let serviceReset : ResetAuthHandler; 
  let serviceCreate : CreateAuthHandler;  
  let serviceUpdate : UpdateAuthHandler;


  const authMock = mock(Auth);
  const auth = instance(authMock);

  auth.create = jest.fn();
  auth.commit = jest.fn();
  beforeEach(async () => {
    

    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, AuthDataAccessModule],
      providers: [CreateAuthHandler,ResetAuthHandler,UpdateAuthHandler,
      {provide: Auth, useValue: auth }],
      
    }).compile();

     serviceReset = module.get<ResetAuthHandler>(ResetAuthHandler);
     serviceCreate = module.get<CreateAuthHandler>(CreateAuthHandler);
     serviceUpdate = module.get<UpdateAuthHandler>(UpdateAuthHandler);

  
    



    resetAuthHandler = new ResetAuthHandler();
    // resetAuthCommand = new ResetAuthCommand();

  });

  describe('ResetAuth', () => {
    it('should work', async () => {

      const result = await serviceReset.execute(resetAuthCommand);
      // console.log(result);
      expect(result).toEqual(NotImplementedException);
    });
  });


  describe('CreateAuth', () => {
    it('should work', async () => {
      const userRecord: admin.auth.UserRecord = {
        uid: '1',  // when(authMock.create()).thenReturn(/* return value */);
        // when(authMock.commit()).thenReturn(/* return value */);
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

      const commandMock: CreateAuthCommand = {
        request: {
          userRecord : userRecord
        },
      };
  
      // Create a mock of Auth object
      // let authMock: Auth = {
      //   create: jest.fn(), // Mock the create method
      //   commit: jest.fn(), // Mock the commit method
      // } as unknown as Auth;
    
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
    
      //  const authMock = new Auth(
      //   data.id,
      //   data.email,
      //   data.displayName,
      //   data.photoURL,
      //   data.phoneNumber,
      //   data.customClaims,
      //   data.created
      // );



    when(eventPublisherMock.mergeObjectContext(Auth.fromData(data))).thenReturn(auth);


    // jest.spyOn(auth, 'create').mockImplementation(() => {});
    // jest.spyOn(auth, 'commit').mockImplementation(() => {});

      
      createAuthHandler = new CreateAuthHandler(eventPublisherMock);

      await serviceCreate.execute(commandMock);

    // Assert that the create and commit methods were called on the authMock object
      await expect(auth.create).toHaveBeenCalled();
      await expect(auth.commit).toBeCalled();
 
 
      // expect(await createAuthHandler.execute(createAuthCommand)).toEqual(NotImplementedException);

      // expect(await createAuthHandler.execute(createAuthCommand)).toEqual(NotImplementedException);
    });
  });
  
  describe('UpdateAuth', () => {

    const data: IAuth = {
      id: "1",
      email: "jan@gmail.com",
      displayName: "Chadicus Maximus",
      photoURL: null,
      phoneNumber: "0716941254",
      customClaims: null,
      created: Timestamp.fromDate(new Date()),
    };

    const request2 : IUpdateAuthRequest = {
       auth : data
    };

    // const commandMock: CreateAuthCommand = {
    //   request: {
    //     userRecord: {
    //       uid: 'userId',
    //       email: 'user@example.com',
    //       displayName: 'John Doe',
    //       photoURL: 'http://example.com/photo.jpg',
    //       phoneNumber: '+1234567890',
    //       customClaims: { admin: true },
    //     },
    //   },
    // };

    // Create a mock of Auth object
    const authMock: Auth = {
      create: jest.fn(), // Mock the create method
      commit: jest.fn(), // Mock the commit method
    } as unknown as Auth;


    updateAuthCommand = new UpdateAuthCommand(request2);
    // updateAuthHandler = new UpdateAuthHandler(publisherMock);
    it('should work', async () => {
      expect(await updateAuthHandler.execute(updateAuthCommand)).toEqual(NotImplementedException);
    });
  });

});
  

