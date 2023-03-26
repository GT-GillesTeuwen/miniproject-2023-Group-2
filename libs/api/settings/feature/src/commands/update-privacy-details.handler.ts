import { SettingsRepository } from '@mp/api/settings/data-access';
import {
    UpdatePrivacyDetailsCommand,
    IUpdatePrivacyDetailsResponse
    // IProfile,
    // ProfileStatus
} from '@mp/api/settings/util';
import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Settings } from '../models';
import { ISettings } from '@mp/api/settings/util';

@CommandHandler(UpdatePrivacyDetailsCommand)
export class UpdatePrivacyDetailsHandler
  implements ICommandHandler<UpdatePrivacyDetailsCommand, IUpdatePrivacyDetailsResponse>
{
  //CORRECT CONSTRUCTOR:
  //constructor(private publisher: EventPublisher, private readonly repository: SettingsRepository) {}

  constructor(private readonly repository: SettingsRepository) {}

  async execute() {
    const settings: ISettings = {
      userId: "undefined"
    };

    const response: IUpdatePrivacyDetailsResponse = {
      settings: settings
    };
    return response;
  }
}
