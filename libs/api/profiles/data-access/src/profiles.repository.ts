import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {
    if(profile.UID==null){
      throw new Error();
    }
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<IProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IProfile;
        },
        toFirestore: (it: IProfile) => it,
      })
      .doc(profile.UID)
      .get();
  }

  async createProfile(profile: IProfile) {
    // Remove password field if present
    if(profile.UID==null){
      throw new Error();
    }
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.UID)
      .create(profile);
  }

  async updateProfile(profile: IProfile) {
    if(profile.UID==null){
      throw new Error();
    }
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.UID)
      .set(profile, { merge: true });
  }
}
