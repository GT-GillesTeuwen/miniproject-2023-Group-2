import { ChatService } from '@mp/api/chat/feature';
import {
    IUpdateAccountDetailsRequest,
    IUpdateAccountDetailsResponse,
    IUpdateAddressDetailsRequest,
    IUpdateAddressDetailsResponse,
    IUpdateContactDetailsRequest,
    IUpdateContactDetailsResponse,
    IUpdateOccupationDetailsRequest,
    IUpdateOccupationDetailsResponse,
    IUpdatePersonalDetailsRequest,
    IUpdatePersonalDetailsResponse
} from '@mp/api/profiles/util';
import { ICreateConversationRequest, ICreateConversationResponse, IMessageSendRequest,IMessageSendResponse} from '@mp/api/chat/util'
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

// export const updateAccountDetails = functions.https.onCall(
//   async (
//     request: IUpdateAccountDetailsRequest
//   ): Promise<IUpdateAccountDetailsResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const service = app.get(ProfilesService);
//     return service.updateAccountDetails(request);
//   }
// );

export const createConversation = functions.https.onCall(
  async (
    request: ICreateConversationRequest
  ): Promise<ICreateConversationResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatService);
    return service.createConversation2(request);
  }
);

export const sendMessage = functions.https.onCall(
  async (
    request: IMessageSendRequest
  ): Promise<IMessageSendResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ChatService);
    return service.sendMessage(request);
  }
);

// export const updateContactDetails = functions.https.onCall(
//   async (
//     request: IUpdateContactDetailsRequest
//   ): Promise<IUpdateContactDetailsResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const service = app.get(ProfilesService);
//     return service.updateContactDetails(request);
//   }
// );

// export const updatePersonalDetails = functions.https.onCall(
//   async (
//     request: IUpdatePersonalDetailsRequest
//   ): Promise<IUpdatePersonalDetailsResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const service = app.get(ProfilesService);
//     return service.updatePersonalDetails(request);
//   }
// );

// export const updateOccupationDetails = functions.https.onCall(
//   async (
//     request: IUpdateOccupationDetailsRequest
//   ): Promise<IUpdateOccupationDetailsResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//     const service = app.get(ProfilesService);
//     return service.updateOccupationDetails(request);
//   }
// );
