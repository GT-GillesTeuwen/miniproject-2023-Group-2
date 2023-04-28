import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
IProfile
} from '@mp/api/profiles/util';

@Injectable()
export class SettingsApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  // profile$(id: string) {
  //   const docRef = doc(
  //     this.firestore,
  //     `profiles/${id}`
  //   ).withConverter<IProfile>({
  //     fromFirestore: (snapshot) => {
  //       return snapshot.data() as IProfile;
  //     },
  //     toFirestore: (it: IProfile) => it,
  //   });
  //   return docData(docRef, { idField: 'id' });
  // }

 

}
