import { Timestamp } from 'firebase-admin/firestore';
import { IPrivacyDetails } from './privacy-details.interface';

export interface ISettings {
  userId: string;
  //this should be added
  // privacyDetails?: ISettingsDetails | null | undefined;
  // created?: Timestamp | null | undefined;
}
