import { Injectable } from '@angular/core';
import { SetError } from '@mp/app/errors/util';
import { Settings } from '@mp/app/settings/util';
import { Action, State, StateContext } from '@ngxs/store';
import { SettingsApi } from './settings.api';
import { Store } from '@ngxs/store';

export interface SettingsStateModel {
  // registerForm: {
  //   model: {
  //     displayName: string | null;
  //     email: string | null;
  //     password: string | null;
  //   };
  //   dirty: false;
  //   status: string;
  //   errors: object;
  // };
}

// @State<SettingsStateModel>({
//   name: 'register',
//   defaults: {
//     registerForm: {
//       model: {
//         displayName: null,
//         email: null,
//         password: null,
//       },
//       dirty: false,
//       status: '',
//       errors: {},
//     },
//   },
// })
@Injectable()
export class SettingsState {

  constructor(
    private readonly settingsApi: SettingsApi,
    private readonly store: Store
  ) {}

  @Action(SetSettings)
  async settings(ctx: StateContext<SettingsStateModel>) {
    try {
      const state = ctx.getState();
      // const UID = state.profile?.UID;
      // const Hobby = state.personalDetailsForm.model.Hobby;
      // const Major = state.personalDetailsForm.model.Major;
      // const Cell = state.personalDetailsForm.model.Cell;

      // if (!UID || !Hobby || !Major || !Cell)
      //   return ctx.dispatch(
      //     new SetError('UserId or age or gender or ethnicity not set')
      //   );

      // const request: IUpdatePersonalDetailsRequest = {
      //   profile: {
      //     UID,
      //     ContactDetails: {
      //       Cell
      //     },
      //     Hobby,
      //     Major
      //   },
      // };
      const responseRef = await this.SettingsApi.updatePersonalDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
