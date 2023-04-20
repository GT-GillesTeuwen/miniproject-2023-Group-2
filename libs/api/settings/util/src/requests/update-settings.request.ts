
import {ISettings} from '../../../../profiles/util/src'

export interface IUpdateSettingsRequest {
  UID: string |undefined;
  settings:ISettings;
}

