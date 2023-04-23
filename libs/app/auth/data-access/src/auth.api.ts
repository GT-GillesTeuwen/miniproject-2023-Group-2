import { Injectable } from '@angular/core';
import { doc, docData, Firestore, collection, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
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
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthApi {
  constructor(
    public readonly auth: Auth,
    private readonly functions: Functions,
    private readonly firestore: Firestore,
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

      const userCredential =  await createUserWithEmailAndPassword(this.auth, email, password);

      const id = userCredential.user.uid;
      console.log("MEKHAIL-> UID = " + id)
      const profile: IProfile = {
        UID: id, 
        Bio: null,
        ProfilePhotos: ["https://picsum.photos/200/400?random=13"],
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
  
  async completeRegister(uid:string, gender : string,age : string,firstname : string, lastname : string, email:string)
  {
    
      
      console.log("MEKHAIL-> UID = " + uid)
      const profile: IProfile = {
        UID: uid, 
        Bio: null,
        ProfilePhotos: ["https://picsum.photos/200/400?random=13"],
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
       await this.updateProfileDetails( {profile});
       
      //  alert("auth.api Id is: "+this.auth.currentUser?.uid);
      return uid;
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
    return (await signInWithPopup(this.auth, provider)).user.uid;
  }

  async findProfile(uid: string) {
    console.log
    const docRef = doc(
      this.firestore,
      `profiles/${uid}`
    ).withConverter<IProfile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IProfile;
      },
      toFirestore: (it: IProfile) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async logout() {
    return await signOut(this.auth);
  }
}
