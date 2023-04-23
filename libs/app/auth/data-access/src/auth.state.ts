import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
// import { Observable } from '@firebase/util';
import { Gender, IProfile } from '@mp/api/profiles/util';
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
import { map, Observable, tap } from 'rxjs';
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
      const uid = await this.authApi.continueWithGoogle()
      alert(uid)
      


      
      const obsProfile = await this.authApi.findProfile(uid);
      let profile:IProfile
      try {
        profile = await this.subscribeProfile(obsProfile)
        alert("GENDER: "+ profile.Gender)
      } catch (error){
        return ctx.dispatch(new SetError("SubscribePRofile Failed"));
      }
      
      // profile.subscribe((profile: IProfile) => {
      //   alert("UID: " +profile.UID)

      //   gender = profile.Gender;
      //   alert("subscribe GENDER: "+gender)
      // })

      // profile.pipe(
      //   map((profile: IProfile) => {
      //     return {
      //       gender: profile.Gender
      //     };
      //   })
      // ).subscribe((data) => {
      //   gender = data.gender
      //   // use name and age as needed
      // });
      alert("GENDER: "+ profile.Gender)
      if(profile.Gender == undefined){
        alert("redirect")
        return ctx.dispatch(new Navigate(['register/complete']));
      }
      alert("failed redirect")
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  async subscribeProfile(data:(Observable<IProfile>)){
    let profile!:IProfile 
    data.subscribe((user: IProfile) => {
        profile = user
        return profile
      })
  }

  @Action(Logout)
  async logout(ctx: StateContext<AuthStateModel>) {
    await this.authApi.logout();
    return ctx.dispatch(new Navigate(['/']));
  }
}
