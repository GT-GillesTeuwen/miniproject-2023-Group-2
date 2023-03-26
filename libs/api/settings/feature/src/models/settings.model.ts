import {
    PrivacyDetailsUpdatedEvent,
    IPrivacyDetails,
    ISettings,
} from '@mp/api/settings/util';
import { NotImplementedException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Settings extends AggregateRoot implements ISettings {
  constructor(
    public userId: string
    //need to add these
    //public privacyDetails?: IPrivacyDetails | null | undefined,
    //public created?: FirebaseFirestore.Timestamp | null | undefined
  ) {
    super();
  }

  static fromData(settings: ISettings): Settings {
    const instance = new Settings(
      settings.userId,
      //need to add these
      //settings.privacyDetails,
      //settings.created
    );
    return instance;
  }

  updatePrivacyDetails(accountDetails: IPrivacyDetails) {
    return NotImplementedException;
  }
}
