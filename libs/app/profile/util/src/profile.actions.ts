import { IProfile, ISettings } from '@mp/api/profiles/util';

export class Logout {
  static readonly type = '[Profile] Logout';
}

export class SubscribeToProfile {
  static readonly type = '[Profile] SubscribeToProfile';
}

export class SetProfile {
  static readonly type = '[Profile] SetProfile';
  constructor(public readonly profile: IProfile | null) {}
}

export class UpdateAccountDetails {
  static readonly type = '[Profile] UpdateAccountDetails';
}

export class UpdateAddressDetails {
  static readonly type = '[Profile] UpdateAddressDetails';
}

export class UpdateContactDetails {
  static readonly type = '[Profile] UpdateContactDetails';
}

export class UpdateOccupationDetails {
  static readonly type = '[Profile] UpdateOccupationDetails';
}

export class UpdatePersonalDetails {
  static readonly type = '[Profile] UpdatePersonalDetails';
}

export class SaveProfileChanges{
  static readonly type = '[Profile] SaveProfileChanges';
  constructor(
    public readonly bio: string,
    public readonly major: string,
    public readonly cell: string,
    public readonly hobbies: string[],
  ) {}
}

export class UpdateProfilePhotos{
  static readonly type = '[Profile] UpdateProfilePhotos';
  constructor(
    public readonly profilePhotos: string[],
  ) {alert("at profile actions")}
}

export class UpdateSettings{
  static readonly type = '[Profile] UpdateSettings';
  constructor(
    public readonly settings: ISettings,
  ) {alert("at profile actions")}
}



