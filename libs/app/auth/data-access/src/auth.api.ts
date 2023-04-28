import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { signOut } from '@firebase/auth';
import { IUpdateProfileRequest, IUpdateProfileResponse,IProfile } from '@mp/api/profiles/util';
import { IRemoveAuthRequest, IRemoveAuthResponse, IUpdateAuthRequest, IUpdateAuthResponse} from '@mp/api/auth/util'

@Injectable()
export class AuthApi {
  constructor(
    public readonly auth: Auth,
    private readonly functions: Functions
    ) {}

  auth$() {
    return authState(this.auth);
  }

  

  async login(email: string, password: string) {
    alert("init card-stack");
    const isFirstTime = sessionStorage.getItem('firstTime') === null;

    if (isFirstTime) {
      alert("only once you say!??");
      sessionStorage.setItem('currentIndex', '0');
      sessionStorage.setItem('firstTime', 'false');
    }
    const userCredential= await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential;
  }

  async updateProfileDetails(request: IUpdateProfileRequest) {
    return await httpsCallable<
      IUpdateProfileRequest,
      IUpdateProfileResponse
    >(
      this.functions,   // auth.functions.ts in api/core/feature
      'updateProfile'
    )(request);
  }

  async register(gender : string,age : string,firstname : string, lastname : string,email: string, password: string) {

      const userCredential =  await createUserWithEmailAndPassword(this.auth, email, password);

      const id = userCredential.user.uid;
      console.log("MEKHAIL-> UID = " + id)
      const profile: IProfile = {
        UID: id, 
        Bio: null,
        ProfilePhotos: [],
        TimeRemaining: 250,
        RecentlyActive: null,
        Gender: gender,
        Age: age,
        Hobby: null,
        Major: null,
        Name: {
          Firstname : firstname,
          Lastname : lastname
        },
        ContactDetails: {
          Email : email,
          Cell : null
        },
        Matches : null,
        Created: null,
      };
      const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));
      await sleep(2000)
       await this.updateProfileDetails( {profile});
       
      //  alert("auth.api Id is: "+this.auth.currentUser?.uid);
      return userCredential;
  }

  



  async resetPassword(email: string, password: string, newPassword : string) {

    try {
      const userCredential =  await  this.login(email,password);
      return await updatePassword(userCredential.user, newPassword);
    }
    catch(error)  { // invalid password
      console.error(error);
      console.log("meep")
    };
  }

  async forgotPassword(email: string) {
    try {
      return await sendPasswordResetEmail(this.auth,email);
    }
    catch(error)  { // invalid password
      console.error(error);
    };
  }



  async continueWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }


  async RemoveAuth(request: IUpdateAuthRequest) {
    await httpsCallable<
      IUpdateAuthRequest,
      IUpdateAuthResponse
    >(
      this.functions,   // auth.functions.ts in api/core/feature
      'removeAuth'
    )(request);
    return await signOut(this.auth);
  }


  async logout() {
    sessionStorage.removeItem('firstTime');
    sessionStorage.removeItem('currentIndex');
    return await signOut(this.auth);
  }
}
