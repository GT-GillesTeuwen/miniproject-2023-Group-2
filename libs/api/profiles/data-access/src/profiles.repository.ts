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

  async updateMatches(profile: IProfile) {
    // console.log(profile);
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

      console.log(data);
      if(docMatches)
      {
        const matches = [...docMatches,...profile.Matches]

        profile.Matches = matches;
        console.log(profile)
      }

    return await admin
          .firestore()
          .collection('profiles')
          .doc(profile.UID)
          .set(
            profile,{merge: true}
          )

      }
  }

  async removeProfile(profile : IProfile){
    // Get a reference to the document to be deleted
    if(profile.UID)
      {
        const docRef = admin.firestore().collection("profiles").doc(profile.UID);

        // Delete the document
        docRef.delete().then(function() {
            console.log("User successfully deleted! User : "+profile.UID);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    

      }
    else
    throw "Cannot remove user with this id : Does not exist";
 
  }



}
