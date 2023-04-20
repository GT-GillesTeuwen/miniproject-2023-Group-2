import { Timestamp } from 'firebase-admin/firestore';
import { IContactDetails } from './contact-details.interface';
import { IPersonalDetails } from './personal-details.interface';
import { IMatchDetails } from './match-details.interface';
import { ISettings } from './settings.interface';

export interface IProfile {

  UID: string | null | undefined;
  Bio?: string | null | undefined;
  ProfilePhotos?: string[] | null |undefined;
  TimeRemaining?: number | null | undefined; 
  RecentlyActive?: boolean | null | undefined;
  Gender?: string | null | undefined;
  Age?: string | null | undefined;
  Hobby?: string[] | null | undefined;
  Major? : string | null | undefined;
  Name?: IPersonalDetails | null | undefined;
  ContactDetails?: IContactDetails | null | undefined;
  Matches?: IMatchDetails[] | null |undefined;
  Created?: Timestamp | null | undefined;
  Settings?: ISettings | null | undefined;
}
