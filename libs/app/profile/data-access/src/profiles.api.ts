import { Injectable } from '@angular/core';
import { doc, docData, Firestore, collection } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
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
  IRemoveProfileRequest,
  IRemoveProfileResponse
} from '@mp/api/profiles/util';

import { getDocs } from 'firebase/firestore';
import { IUpdateSettingsRequest } from '@mp/api/settings/util';


@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) { }

  profile$(id: string) {
    console.log
    const docRef = doc(
      this.firestore,
      `profiles/${id}`
    ).withConverter<IProfile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IProfile;
      },
      toFirestore: (it: IProfile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async matches$(): Promise<IProfile[]> {
    
    const docRef = collection(this.firestore, 'profiles').withConverter<IProfile>({
      fromFirestore: (snapshot) => {
        console.log("In Profile API fetching all profiles")
        console.log(snapshot.data());
        return snapshot.data() as IProfile;
      },
      toFirestore: (it: IProfile) => it,
    });
  
    try {
      const querySnapshot = await getDocs(docRef);
      return querySnapshot.docs.map((doc) => doc.data() as IProfile);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }
  }

  async updateProfileDetails(request: IUpdateProfileRequest) {
    console.log(request)
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

  async updateProfilePhotos(request: IUpdatePersonalDetailsRequest) {

    const profile: IProfile = {
      UID: request.profile.UID,
      ProfilePhotos: request.profile.ProfilePhotos,
    };

    return await this.updateProfileDetails({ profile });


}
  async updateTime(request: IUpdatePersonalDetailsRequest){
      //alert("this is the time update")
    const profile: IProfile = {
      UID:request.profile.UID, 
      TimeRemaining: request.profile.TimeRemaining,
    };

    return await this.updateProfileDetails( {profile});
  }

  async updateOtherProfileTime(request: IUpdatePersonalDetailsRequest){
    //alert("this is the time update")
  const profile: IProfile = {
    UID:request.profile.UID, 
    TimeRemaining: request.profile.TimeRemaining,
  };

  return await this.updateProfileDetails( {profile});
}

  async removeProfile(request: IRemoveProfileRequest){
    return await httpsCallable<
      IRemoveProfileRequest,
      IRemoveProfileResponse
    >(
      this.functions,
      'RemoveProfile'
    )(request);

}

async getUserProfileDetails(request: IGetUserProfileRequest) {
  if (request.userId == ''){
    console.log("request.userId == null")
    let response: IGetUserProfileResponse = {
      status: 0,
      status_name: '',
      content: {error_message:'User not found'}
    }
    return httpsCallable
  }
  return await httpsCallable<
    IGetUserProfileRequest,
    IGetUserProfileResponse
  >(
    this.functions,
    'getUserProfile'
  )(request);
}

  async updateSettings(request: IUpdateSettingsRequest) {

    const profile: IProfile = {
      UID: request.UID,
      Settings: request.settings,
    };
    console.log(profile);
    return await this.updateProfileDetails({ profile });

  }

  async updateAccountDetails(request: IUpdateAccountDetailsRequest) {
    return await httpsCallable<
      IUpdateAccountDetailsRequest,
      IUpdateAccountDetailsResponse
    >(
      this.functions,
      'updateAccountDetails'
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


}
