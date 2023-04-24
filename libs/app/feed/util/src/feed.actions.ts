import { IProfile } from '@mp/api/profiles/util';


export class SetProfile {
  static readonly type = '[Feed] SetProfile';
  constructor(public readonly profile: IProfile | null) {}
}

export class getProfileSuggestions{
    static readonly type = '[Feed] getProfileSuggestions';
}

export class updateMatches {
  static readonly type = '[Feed] updateMatches';
  constructor(
    public readonly MatchUserID: string,
    public readonly MatchTargetID: string,
    public readonly type: string,
  ) {}
}