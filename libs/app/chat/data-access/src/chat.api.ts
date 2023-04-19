import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IConversation, ICreateConversationRequest, ICreateConversationResponse } from '@mp/api/chat/util';
import {
  IGetUserProfileRequest, IGetUserProfileResponse,
  IProfile,
  IUpdateAccountDetailsRequest,
  IUpdateAccountDetailsResponse,
  IUpdateAddressDetailsRequest,
  IUpdateAddressDetailsResponse,
  IUpdateContactDetailsRequest,
  IUpdateContactDetailsResponse,
  IUpdateOccupationDetailsRequest,
  IUpdateOccupationDetailsResponse,
  IUpdatePersonalDetailsRequest,
  IUpdatePersonalDetailsResponse,
  IUpdateProfileRequest,
  IUpdateProfileResponse
} from '@mp/api/profiles/util';


@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  conversation$(id: string|null|undefined) {
    if(id==null || id ==undefined){
      throw new Error("ID is null in conversation$ in chat.api.ts")
    }
    console.log
    const docRef = doc(
      this.firestore,
      `collections/${id}`
    ).withConverter<IConversation>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IConversation;
      },
      toFirestore: (it: IConversation) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async updateProfileDetails(request: IUpdateProfileRequest) {
    return await httpsCallable<
      IUpdateProfileRequest,
      IUpdateProfileResponse
    >(
      this.functions,   // auth.functions.ts in api/core/feature
      'updateProfile'
    )(request);
  }


  async saveProfileChanges(request: IUpdatePersonalDetailsRequest){
      
      const profile: IProfile = {
        UID:request.profile.UID, 
        Bio: request.profile.Bio,
        Hobby: request.profile.Hobby,
        Major: request.profile.Major,
        ContactDetails: {
          Cell : request.profile.ContactDetails?.Cell
        },
      };

      return await this.updateProfileDetails( {profile});

  }

  async updateProfilePhoto(request: IUpdatePersonalDetailsRequest){
      alert("this is in update photo api")
    const profile: IProfile = {
      UID:request.profile.UID, 
      ProfilePhoto: request.profile.ProfilePhoto,
    };

    return await this.updateProfileDetails( {profile});

}

async createConversation(request: ICreateConversationRequest) {
    return await httpsCallable<
      ICreateConversationRequest,
      ICreateConversationResponse
    >(
      this.functions,
      'create'
    )(request);
  }

  async updateContactDetails(request: IUpdateContactDetailsRequest) {
    return await httpsCallable<
      IUpdateContactDetailsRequest,
      IUpdateContactDetailsResponse
    >(
      this.functions,
      'updateContactDetails'
    )(request);
  }

  async updateAddressDetails(request: IUpdateAddressDetailsRequest) {
    return await httpsCallable<
      IUpdateAddressDetailsRequest,
      IUpdateAddressDetailsResponse
    >(
      this.functions,
      'updateAddressDetails'
    )(request);
  }

  async updatePersonalDetails(request: IUpdatePersonalDetailsRequest) {
    return await httpsCallable<
      IUpdatePersonalDetailsRequest,
      IUpdatePersonalDetailsResponse
    >(
      this.functions,
      'updatePersonalDetails'
    )(request);
  }

  async updateOccupationDetails(request: IUpdateOccupationDetailsRequest) {
    return await httpsCallable<
      IUpdateOccupationDetailsRequest,
      IUpdateOccupationDetailsResponse
    >(
      this.functions,
      'updateOccupationDetails'
    )(request);
  }

  async getUserProfileDetails(request: IGetUserProfileRequest) {
    return await httpsCallable<
      IGetUserProfileRequest,
      IGetUserProfileResponse
    >(
      this.functions,
      'getUserProfile'
    )(request);
  }

}
