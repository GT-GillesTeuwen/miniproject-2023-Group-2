import { Injectable } from '@angular/core';
import {
    IProfile, ISettings, IUpdatePersonalDetailsRequest,
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    Logout,
    SaveProfileChanges,
    SetProfile,
    SubscribeToProfile,
    UpdatePersonalDetails,
    UpdateProfilePhotos,
    UpdateSettings,
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { ProfilesApi } from './profiles.api';
import { AuthApi } from 'libs/app/auth/data-access/src/auth.api';
import {IUpdateSettingsRequest} from 'libs/api/settings/util/src'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: IProfile | null;
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
  static profilePhotos(state: ProfileStateModel) {
    return state.profile?.ProfilePhotos;
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
    alert("at profile state")
    try {
     
      alert("this is in updata photo state "+profilePhotos);
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
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  

 
}
