import { ITheme } from '../interfaces';
export class UpdateThemeSettingsEvent {
  constructor(public readonly profile: ITheme) {}
}
