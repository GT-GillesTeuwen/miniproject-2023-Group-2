import { ITheme } from '../interfaces';
export class UpdatePrivacySettingsEvent {
  constructor(public readonly profile: ITheme) {}
}
