import { SettingsModule as SettingsDataAccessModule } from '@mp/api/settings/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    UpdatePrivacyDetailsHandler,
} from './commands';
import {
    PrivacyDetailsUpdatedHandler,
} from './events';
import { SettingsSagas } from './settings.sagas';
import { SettingsService } from './settings.service';
export const CommandHandlers = [
  UpdatePrivacyDetailsHandler,
];
export const EventHandlers = [
  PrivacyDetailsUpdatedHandler,
];

@Module({
  imports: [CqrsModule, SettingsDataAccessModule],
  providers: [
    SettingsService,
    ...CommandHandlers,
    ...EventHandlers,
    SettingsSagas,
  ],
  exports: [SettingsService],
})
export class SettingsModule {}
