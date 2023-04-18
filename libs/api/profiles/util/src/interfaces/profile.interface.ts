import { Timestamp } from 'firebase-admin/firestore';
import { IContactDetails } from './contact-details.interface';
import { IPersonalDetails } from './personal-details.interface';
import { AgeGroup, Gender } from '../enums';
import { IMatchDetails } from './match-details.interface';

export interface IProfile {
  UID: string | undefined;
  Bio?: string | null | undefined;
  ProfilePhoto?: string | null | undefined;
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
}
