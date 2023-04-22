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

// @State<SaveProfileChangesModel>({
//   name: 'profileChanges',
//   defaults:{
//     changes: null
//   }
// })

// @State<ProfileStateModel>({
//   name: 'profile',
//   defaults: {
//     profile: null,
//   },
// })
@Injectable()
export class FeedState {
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
  async updateMatches(ctx: StateContext<ProfileStateModel>,{MatchUserID,MatchTargetID,type}: updateMatches) {
    try {
     
      //alert("this is in saveProfileChanges state "+bio+", "+major+", "+cell);
      alert("We are in state")
      const state = ctx.getState();
      const UID= MatchUserID;
      const MID = MatchTargetID;
      const Type = type;

      
      const responseRef =await this.feedApi.Handle(UID,MID,Type);
      const response = responseRef?.data;
      return response;

    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

}
