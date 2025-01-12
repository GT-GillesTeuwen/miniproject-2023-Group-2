import { Injectable } from '@angular/core';
import {
    IProfile, ISettings, IUpdatePersonalDetailsRequest,
    IRemoveProfileRequest
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    Logout,
    SaveProfileChanges,
    SetProfile,
    SubscribeToProfile,
    SetMatches,
    SubscribeToMatches,    
    UpdateTime,
    UpdatePersonalDetails,
    UpdateProfilePhotos,
    UpdateSettings,
    RemoveProfile,
    UpdateOtherProfileTime
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { tap, from } from 'rxjs';
import { ProfilesApi } from './profiles.api';

import { AuthApi } from '@mp/app/auth/data-access';
import {IUpdateSettingsRequest} from 'libs/api/settings/util/src'
import { Profile } from 'libs/api/profiles/feature/src/models';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: IProfile | null;

  personalDetailsForm: {
    model: {
      Hobby: string[] | null;
      Major: string | null;
      Cell: string | null
    };
    dirty: false;
    status: string;
    errors: object;
  };
  matches: IProfile[] | null;
  TimeRemaining: number;

}

export interface SaveProfileChangesModel{
 changes: SaveProfileChanges | null;
}

@State<SaveProfileChangesModel>({
  name: 'profileChanges',
  defaults:{
    changes: null
  }
})

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null,
    personalDetailsForm: {
      model: {
        Hobby: null,
        Major: null,
        Cell: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
    matches : null,
    TimeRemaining : 0

  },
})

@Injectable()
export class ProfileState {
  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly authApi: AuthApi,
    private readonly store: Store
  ) {}

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static matches(state: ProfileStateModel) {
    return state.profile?.Matches;
  }

  @Selector()
  static allProfiles(state: ProfileStateModel) {
    return state.matches;
  }

  @Selector()
  static profilePhotos(state: ProfileStateModel) {
    return state.profile?.ProfilePhotos;
  }

  @Selector()
  static timeRemaining(state: ProfileStateModel):number {
    if(state.profile!=undefined && state.profile.TimeRemaining!=undefined){
      return state.profile.TimeRemaining;
    }
    return 0;
    
  }

  @Selector()
  static uid(state: ProfileStateModel) {
    return state.profile?.UID;
  }

  @Selector()
  static settings(state: ProfileStateModel) {
    return state.profile?.Settings;

  }

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToProfile)
  subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.profileApi
      .profile$(user.uid)
      .pipe(tap((profile: IProfile) => ctx.dispatch(new SetProfile(profile))));
  }

  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    return ctx.setState(
      produce((draft) => {
        draft.profile = profile;
      })
    );
  }

  @Action(SubscribeToMatches)
  subscribeToMatches(ctx: StateContext<ProfileStateModel>) {
    // const user = this.store.selectSnapshot(AuthState.user);
    // console.log("BAHHHHH");
    // console.log(user);
    // if (!user) return ctx.dispatch(new SetError('User not set'));
    
    const thing= from( this.profileApi
      .matches$())
      .pipe(tap((matches: IProfile[]) => ctx.dispatch(new SetMatches(matches))));
      
    console.log(thing);
      return thing;
  }

  @Action(SetMatches)
  setMatches(ctx: StateContext<ProfileStateModel>, { matches }: SetMatches) {
    return ctx.setState(
      produce((draft) => {
        draft.matches = matches;
      })
    );
  }

  //@Action(UpdateAccountDetails)
  //async updateAccountDetails(ctx: StateContext<ProfileStateModel>) {
  //  try {
  //    const state = ctx.getState();
  //    const UID = state.profile?.UID;
  //    const displayName = state.accountDetailsForm.model.displayName;
  //    const email = state.accountDetailsForm.model.email;
  //    // const photoURL = state.accountDetailsForm.model.photoURL;
  //    const password = state.accountDetailsForm.model.password;

  //    if (!UID || !displayName || !email || !password)
  //      return ctx.dispatch(
  //        new SetError(
  //          'UserId or display name or email or photo URL or password not set'
  //        )
  //      );

  //    const request: IUpdateAccountDetailsRequest = {
  //      profile: {
  //        UID,
  //        accountDetails: {
  //          displayName,
  //          email,
  //          password,
  //        },
  //      },
  //    };
  //    const responseRef = await this.profileApi.updateAccountDetails(request);
  //    const response = responseRef.data;
  //    return ctx.dispatch(new SetProfile(response.profile));
  //  } catch (error) {
  //    return ctx.dispatch(new SetError((error as Error).message));
  //  }
  //}

  //@Action(UpdateContactDetails)
  //async updateContactDetails(ctx: StateContext<ProfileStateModel>) {
  //  try {
  //    const state = ctx.getState();
  //    const UID = state.profile?.UID;
  //    const Cell = state.contactDetailsForm.model.cellphone;

  //    if (!UID || !Cell)
  //      return ctx.dispatch(new SetError('UserId or cellphone not set'));

  //    const request: IUpdateContactDetailsRequest = {
  //      profile: {
  //        UID,
  //        ContactDetails: {
  //          Cell
  //        },
  //      },
  //    };
  //    const responseRef = await this.profileApi.updateContactDetails(request);
  //    const response = responseRef.data;
  //    return ctx.dispatch(new SetProfile(response.profile));
  //  } catch (error) {
  //    return ctx.dispatch(new SetError((error as Error).message));
  //  }
  //}

  //@Action(UpdateAddressDetails)
  //async updateAddressDetails(ctx: StateContext<ProfileStateModel>) {
  //  try {
  //    const state = ctx.getState();
  //    const userId = state.profile?.UID;
  //    const residentialArea = state.addressDetailsForm.model.residentialArea;
  //    const workArea = state.addressDetailsForm.model.workArea;

  //    if (!userId || !residentialArea || !workArea)
  //      return ctx.dispatch(
  //        new SetError('UserId or residential area or work area not set')
  //      );

  //    const request: IUpdateAddressDetailsRequest = {
  //      profile: {
  //        UID,
  //        addressDetails: {
  //          residentialArea,
  //          workArea,
  //        },
  //      },
  //    };
  //    const responseRef = await this.profileApi.updateAddressDetails(request);
  //    const response = responseRef.data;
  //    return ctx.dispatch(new SetProfile(response.profile));
  //  } catch (error) {
  //    return ctx.dispatch(new SetError((error as Error).message));
  //  }
  //}

  @Action(UpdatePersonalDetails)
  async updatePersonalDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const UID = state.profile?.UID;
      const Hobby = ["hobby test"];
      const Major = "major test";
      const Cell = "cell test";

      if (!UID || !Hobby || !Major || !Cell)
        return ctx.dispatch(
          new SetError('UserId or age or gender or ethnicity not set')
        );

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          UID,
          ContactDetails: {
            Cell
          },
          Hobby,
          Major
        },
      };
      const responseRef = await this.profileApi.updatePersonalDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  

  @Action(SaveProfileChanges)
  async saveProfileChanges(ctx: StateContext<ProfileStateModel>,{bio,major,cell,hobbies}: SaveProfileChanges) {
    try {
     
      //alert("this is in saveProfileChanges state "+bio+", "+major+", "+cell);
      const state = ctx.getState();
      const UID= this.authApi.auth.currentUser?.uid;
      const Bio = bio
      const Major = major;
      const Cell =cell;
      const Hobbies=hobbies;
      //alert("UID at saveProfileChanges is "+UID);

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          UID:UID,
          Bio:Bio,
          ContactDetails: {
            Cell:Cell,
          },
          Major:Major,
          Hobby:Hobbies
        },
      };

      const responseRef =await this.profileApi.saveProfileChanges(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateProfilePhotos)
  async updateProfilePhotos(ctx: StateContext<ProfileStateModel>,{profilePhotos}: UpdateProfilePhotos) {
    
    try {
     
      const state = ctx.getState();
      const UID= this.authApi.auth.currentUser?.uid;
      const ProfilePhotos = profilePhotos;
      //alert("UID at saveProfileChanges is "+UID);

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          UID:UID,
          ProfilePhotos:ProfilePhotos,
        },
      };

      const responseRef =await this.profileApi.updateProfilePhotos(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateSettings)
  async updateSettings(ctx: StateContext<ProfileStateModel>,{settings}: UpdateSettings) {
    
    try {
     
      const state = ctx.getState();
      const UID= this.authApi.auth.currentUser?.uid;
      const uSettings:ISettings=settings;
     

      const request: IUpdateSettingsRequest = {
        
          UID:UID,
          settings:uSettings,
        
      };
      console.log(request);
      const responseRef =await this.profileApi.updateSettings(request);
      const response = responseRef.data;
      return response;
      // return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateTime)
  async updateTime(ctx: StateContext<ProfileStateModel>,{TimeRemaining}: UpdateTime) {
    try {
     
      alert("this is in updata time state "+TimeRemaining);
      const state = ctx.getState();
      const UID= this.authApi.auth.currentUser?.uid;
      const timeRemaining = TimeRemaining;
      //alert("UID at saveProfileChanges is "+UID);

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          UID:UID,
          TimeRemaining:timeRemaining,
        },
      };

      const responseRef =await this.profileApi.updateTime(request);
      const response = responseRef.data;
      return response;
      //return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateOtherProfileTime)
  async updateOtherProfileTime(ctx: StateContext<ProfileStateModel>,{timeRemaining, uid}: UpdateOtherProfileTime) {
    try {

      //alert("UID at saveProfileChanges is "+UID);

      const request: IUpdatePersonalDetailsRequest = {
        profile: {
          UID:uid,
          TimeRemaining:timeRemaining,
        },
      };

      const responseRef =await this.profileApi.updateOtherProfileTime(request);
      const response = responseRef.data;
      return response;
      //return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(RemoveProfile)
  async removeProfile(ctx: StateContext<ProfileStateModel>) {
    try {
     
      const UID= this.authApi.auth.currentUser?.uid;

      const request: IRemoveProfileRequest = {
        profile: {
          UID:UID,
        },
      };

      const responseRef =await this.profileApi.removeProfile(request);
      const response = responseRef.data;
      return response;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}