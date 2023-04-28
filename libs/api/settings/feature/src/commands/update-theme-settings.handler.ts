
import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateThemeSettingsCommand } from '@mp/api/settings/util';

@CommandHandler(UpdateThemeSettingsCommand)
export class UpdateThemeSettings implements ICommandHandler<UpdateThemeSettingsCommand> {
  constructor() {console.log}

  async execute(command: UpdateThemeSettingsCommand): Promise<NotImplementedException> {
    return new NotImplementedException
  }
}
