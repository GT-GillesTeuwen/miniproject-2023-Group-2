
import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePrivacySettingsCommand } from '@mp/api/settings/util';

@CommandHandler(UpdatePrivacySettingsCommand)
export class UpdatePrivacySettings implements ICommandHandler<UpdatePrivacySettingsCommand> {
  constructor() {console.log}

  async execute(command: UpdatePrivacySettingsCommand): Promise<NotImplementedException> {
    return new NotImplementedException
  }
}
