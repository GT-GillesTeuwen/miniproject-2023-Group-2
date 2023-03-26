import { ISettings } from '@mp/api/settings/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SettingsRepository {
  async findOne(settings: ISettings) {
    return await admin
      .firestore()
      .collection('settings')
      .withConverter<ISettings>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as ISettings;
        },
        toFirestore: (it: ISettings) => it,
      })
      .doc(settings.userId)
      .get();
  }

  async updateSettings(settings: ISettings) {
    // Remove password field if present
    //dont know how to fix next line
    //delete settings.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(settings.userId)
      .set(settings, { merge: true });
  }
}
