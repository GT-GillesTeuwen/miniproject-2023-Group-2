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
    

    try {
      const userCredential =  await createUserWithEmailAndPassword(this.auth, email, password);

      const id = userCredential.user.uid;

      const profile: IProfile = {
        UID: id, 
        Bio: null,
        ProfilePhoto: "https://picsum.photos/200/400?random=13",
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

       this.updateProfileDetails( {profile});
       
      //  alert("auth.api Id is: "+this.auth.currentUser?.uid);
      return userCredential;

    }
    catch(error)  { // invalid password
      console.error(error);
      console.log("meep")
      return null;
    };


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
      console.log("meep")
    };
  }



  async continueWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
