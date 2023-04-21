import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
    ContinueWithGoogle,
    Login,
    Logout,
    Register,
    SetUser,
    SubscribeToAuthState,
    ResetPassword,
    ForgotPassword
} from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { AuthApi } from './auth.api';

export interface AuthStateModel {
  user: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private readonly authApi: AuthApi) {}

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Action(SubscribeToAuthState)
  public subscribeToAuthState(ctx: StateContext<AuthStateModel>) {
    return this.authApi.auth$().pipe(
      tap((user: User | null) => {
        ctx.dispatch(new SetUser(user));
      })
    );
  }

  @Action(SetUser)
  async setUser(ctx: StateContext<AuthStateModel>, { user }: SetUser) {
    ctx.setState(
      await produce((draft) => {
        draft.user = user;
      })
    );
  }

  @Action(Login)
  async login(ctx: StateContext<AuthStateModel>, { email, password }: Login) {
    try {
      await this.authApi.login(email, password);
      
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError("Incorrect Email or Password"));
    }
  }

  @Action(Register)
  async register(
    ctx: StateContext<AuthStateModel>,
    {gender,age,firstname,lastname, email ,password }: Register
  ) {
    try {
      const userCredential=await this.authApi.register(gender,age,firstname,lastname,email,password);
      //alert("id is "+userCredential?.user.uid);
      
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError("This email already exists!"));
    }
  }


  @Action(ResetPassword)
  async resetPassword(
    ctx: StateContext<AuthStateModel>,
    { email, password,newPassword }: ResetPassword
  ) {
    try {
      await this.authApi.resetPassword(email, password,newPassword);
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError("Incorrect email"));
    }
  }

  @Action(ForgotPassword)
  async forgotPassword(
    ctx: StateContext<AuthStateModel>,
    { email}: ForgotPassword
  ) {
    try {
      await this.authApi.forgotPassword(email);
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError("A user with that email doesnt exists"));
    }
  }

  @Action(ContinueWithGoogle)
  async continueWithGoogle(ctx: StateContext<AuthStateModel>) {
    try {
      await this.authApi.GoogleSignIn();
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(Logout)
  async logout(ctx: StateContext<AuthStateModel>) {
    await this.authApi.logout();
    return ctx.dispatch(new Navigate(['/']));
  }
}
