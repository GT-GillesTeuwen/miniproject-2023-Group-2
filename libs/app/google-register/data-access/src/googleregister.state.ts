import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface GoogleRegisterStateModel {
  registerForm: {
    model: {
      firstName: string | null;
      lastName: string | null;
      gender: string | null;
      age : string | null;
      email: string | null;
      password: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<GoogleRegisterStateModel>({
  name: 'register',
  defaults: {
    registerForm: {
      model: {
        firstName: null,
        lastName: null,
        gender: null,
        age : null,
        email: null,
        password: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class GoogleRegisterState {
  @Action(Register)
  async register(ctx: StateContext<GoogleRegisterStateModel>) {
    try {
      const state = ctx.getState();
      const email = state.registerForm.model.email;
      const firstName = state.registerForm.model.firstName;
      const lastName = state.registerForm.model.lastName;
      const gender = state.registerForm.model.gender;
      const age = state.registerForm.model.age;
      const password = state.registerForm.model.password;

      if (email && firstName && lastName && gender && age && password) {
        return ctx.dispatch(new AuthRegister(gender ,age, firstName, lastName ,email, password));
      }
      return ctx.dispatch(new SetError('Invalid input'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
