import { Injectable } from '@angular/core';
import { GoogleRegister as AuthGoogleRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { GoogleRegister } from '@mp/app/google-register/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface GoogleRegisterStateModel {
  registerForm: {
    model: {
      uid: string | null;
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
        uid: null,
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
  @Action(GoogleRegister)
  async register(ctx: StateContext<GoogleRegisterStateModel>) {
    try {
      //alert("Reached state.ts")
      const state = ctx.getState();
      const uid = state.registerForm.model.uid;
      const email = state.registerForm.model.email;
      const firstName = state.registerForm.model.firstName;
      const lastName = state.registerForm.model.lastName;
      const gender = state.registerForm.model.gender;
      const age = state.registerForm.model.age;
      //const password = state.registerForm.model.password;
      //alert(email! + firstName + lastName)
      if (email && firstName && lastName && gender && age) {
        return ctx.dispatch(new AuthGoogleRegister(uid!, gender ,age, firstName, lastName ,email));
      }
      return ctx.dispatch(new SetError('Invalid input'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
