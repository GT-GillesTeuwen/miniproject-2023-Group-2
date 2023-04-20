import { Injectable } from '@angular/core';
import { Register as AuthRegister, ForgotPassword } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Forgot } from '@mp/app/forgot/util'
import { Action, State, StateContext } from '@ngxs/store';

export interface ForgotStateModel {
  forgotForm: {
    model: {
      email: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<ForgotStateModel>({
  name: 'forgot',
  defaults: {
    forgotForm: {
      model: {
        email: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class ForgotState {
  @Action(Forgot)
  async forgot(ctx: StateContext<ForgotStateModel>) {
    try {
      const state = ctx.getState();
      const email = state.forgotForm.model.email;
        //alert(state.forgotForm.model);
        console.log(state.forgotForm.model);
      if (email) {
        //alert('hello');
        return ctx.dispatch(new ForgotPassword(email));
      }
      return ctx.dispatch(new SetError('Invalid input'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
