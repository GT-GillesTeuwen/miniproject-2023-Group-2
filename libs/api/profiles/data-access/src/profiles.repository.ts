import { IMatchDetails, IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {

    if( profile.UID)
    {
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
  }

  async createProfile(profile: IProfile) {
    // Remove password field if present

    if(profile.UID)
    {

    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.UID)
      .create(profile);
  }
}

  async updateProfile(profile: IProfile) {

    if(profile.UID)
    {
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.UID)
      .set(
        profile, { merge: true }
        );
      }
  }

  //Hopium

  async updateMatches(profile: IProfile) {
    if(profile.Matches && profile.UID)
    {
      const doc = await admin
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
  
      const data = doc.data();
      const docMatches = data?.Matches;
      if(docMatches)
      {
        const matches = [...docMatches,...profile.Matches]

        profile.Matches = matches;
    
        return await admin
          .firestore()
          .collection('profiles')
          .doc(profile.UID)
          .set(
            profile,{merge: true}
          )
    }

      }
      
   
  }
}
