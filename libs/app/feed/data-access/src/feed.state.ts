import { Injectable } from '@angular/core';
import {
    IMatchDetails,
    IProfile,
    IUpdateProfileRequest
} from '@mp/api/profiles/util';
import { SetError } from '@mp/app/errors/util';
import {
    SaveProfileChanges,
    SetProfile,
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import { ProfilesApi } from '@mp/app/profile/data-access';
import { AuthApi } from '@mp/app/auth/data-access';
import { updateMatches } from '@mp/app/feed/util';
import { FeedApi } from './feed.api';

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
    private readonly feedApi: FeedApi,
    private readonly authApi: AuthApi,
    private readonly store: Store
  ) {}

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }


  

  @Action(updateMatches)
  async updateMatches(ctx: StateContext<ProfileStateModel>,{MatchUserID}: updateMatches) {
    try {
     
      //alert("this is in saveProfileChanges state "+bio+", "+major+", "+cell);
      const state = ctx.getState();
      const UID= this.authApi.auth.currentUser?.uid;
      const MID = MatchUserID;
      const CID = null;
      const MEID =null;
      //alert("UID at saveProfileChanges is "+UID);

      const matches : IMatchDetails ={
        MatchUserID:MatchUserID,
        PairID: CID,
        MatchStatus : MEID
      };

      const request: IUpdateProfileRequest = {
        profile: {
          UID:UID,
          Matches: [matches],
        },
      };

      const responseRef =await this.feedApi.updateMatches(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

}
