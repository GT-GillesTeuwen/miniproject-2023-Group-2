import { ISettings } from '@mp/api/profiles/util';
import { ITheme } from '../interfaces';
export interface IUpdateSettingsResponse {
  UID: string;
  settings:ISettings;
}
