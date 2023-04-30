import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, getDocs } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IConversation, ICreateConversationRequest, ICreateConversationResponse, IMessageSendRequest, IMessageSendResponse, IUpdateMeetingRequest, IUpdateMeetingResponse } from '@mp/api/chat/util';
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
  IUpdateProfileResponse,
  IUpdateTimeRequest
} from '@mp/api/profiles/util';
import { ChatState } from './chat.state';
import { ProfilesApi, ProfileState } from '@mp/app/profile/data-access';
import { Store } from '@ngxs/store';
import { UpdateTime } from '@mp/app/profile/util';


@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions,
    private readonly store: Store
  ) { }

  conversation$(id: string | null | undefined) {
    if (id == null || id == undefined) {
      throw new Error("ID is null in conversation$ in chat.api.ts")
    }
    console.log
    const docRef = doc(
      this.firestore,
      `conversations/${id}`
    ).withConverter<IConversation>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IConversation;
      },
      toFirestore: (it: IConversation) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async allConvos$(): Promise<IConversation[]> {
    
    const docRef = collection(this.firestore, 'conversations').withConverter<IConversation>({
      fromFirestore: (snapshot) => {
        console.log("In Chat API fetching all convos")
        console.log(snapshot.data());
        return snapshot.data() as IConversation;
      },
      toFirestore: (it: IConversation) => it,
    });
  
    try {
      const querySnapshot = await getDocs(docRef);
      return querySnapshot.docs.map((doc) => doc.data() as IConversation);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }
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


  async saveProfileChanges(request: IUpdatePersonalDetailsRequest) {

    const profile: IProfile = {
      UID: request.profile.UID,
      Bio: request.profile.Bio,
      Hobby: request.profile.Hobby,
      Major: request.profile.Major,
      ContactDetails: {
        Cell: request.profile.ContactDetails?.Cell
      },
    };

    return await this.updateProfileDetails({ profile });

  }

  async updateProfilePhoto(request: IUpdatePersonalDetailsRequest){
    const profile: IProfile = {
      UID:request.profile.UID, 
      ProfilePhotos: request.profile.ProfilePhotos,
    };

    return await this.updateProfileDetails({ profile });

  }

  async createConversation3(request: ICreateConversationRequest) {
    return await httpsCallable<
      ICreateConversationRequest,
      ICreateConversationResponse
    >(
      this.functions,
      'createConversation'
    )(request);
  }

  async sendMessageBack(request: IMessageSendRequest) {
    return await httpsCallable<
      IMessageSendRequest,
      IMessageSendResponse
    >(
      this.functions,
      'sendMessage'
    )(request);
  }

  async sendMessage(request: IMessageSendRequest) {

    var meetTimeInvested=request.newMeetingTime;
    const updateTimeInvestedReq:IUpdateMeetingRequest={
      pairID:request.pairID,
      meeting:{
        TimeInvested:meetTimeInvested
      }
    }
    this.updateMeetingBack(updateTimeInvestedReq);
    
    return await this.sendMessageBack(request);
  }



  async updateMeeting(request: IUpdateMeetingRequest) {
    var uTimeRem=0;
    
    this.store.select(ProfileState.timeRemaining).subscribe((time) => {
      if (time != undefined) {
        uTimeRem = time;
      }
    });

    var meetTimeInvested:number|null|undefined;
    var meetDate:string|null|undefined;
    var meetTime:string|null|undefined;
    var meetLocation:string|null|undefined;
    this.store.select(ChatState.conversation).subscribe((conversation) => {
      if (conversation != undefined && conversation.MeetingDetails!=undefined) {
        
          meetTimeInvested = conversation.MeetingDetails?.TimeInvested;
          meetDate=conversation.MeetingDetails.Date;
          meetTime=conversation.MeetingDetails.Time;
          meetLocation=conversation.MeetingDetails.Location;
       
      }
    });

    request.meeting.TimeInvested=meetTimeInvested;
    console.log(meetDate);
    console.log(meetLocation);
    console.log(meetTime);
    var changed=false;
    if (meetDate == null||meetDate==undefined) {
      uTimeRem=uTimeRem-10;
      changed=true;
      request.meeting.TimeInvested = request.meeting.TimeInvested! + 10;
    }
    if (meetTime == null||meetTime==undefined) {
      uTimeRem=uTimeRem-10;
      changed=true;
      request.meeting.TimeInvested = request.meeting.TimeInvested! + 10;
    }
    if (meetLocation == null||meetLocation==undefined) {
      uTimeRem=uTimeRem-10;
      changed=true;
      request.meeting.TimeInvested = request.meeting.TimeInvested! + 10;
    }
    if(changed){
      this.store.dispatch(new UpdateTime(uTimeRem));
    }
    
    return await this.updateMeetingBack(request);
  }

  async updateMeetingBack(request: IUpdateMeetingRequest) {
    return await httpsCallable<
      IUpdateMeetingRequest,
      IUpdateMeetingResponse
    >(
      this.functions,
      'updateMeeting'
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
