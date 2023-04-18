import { IProfile } from '@mp/api/profiles/util';

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

export class SubscribeToMatches {
  static readonly type = '[Profile] SubscribeToMatches';
}

export class SetMatches {
  static readonly type = '[Profile] SetMatches';
  constructor(public readonly matches: IProfile[] | null) {}
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

export class UpdateProfilePhoto{
  static readonly type = '[Profile] UpdateProfilePhoto';
  constructor(
    public readonly profilePhoto: string,
  ) {}
}



