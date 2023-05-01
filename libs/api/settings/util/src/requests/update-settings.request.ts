
import {ISettings} from '@mp/api/profiles/util'

export interface IUpdateSettingsRequest {
  UID: string |undefined;
  settings:ISettings;
}

