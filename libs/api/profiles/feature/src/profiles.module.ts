import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    CreateProfileHandler,
    UpdateContactDetailsHandler,
    UpdatePersonalDetailsHandler,
} from './commands';
import {
    AccountDetailsUpdatedHandler,
    AddressDetailsUpdatedHandler,
    ContactDetailsUpdatedHandler,
    OccupationDetailsUpdatedHandler,
    PersonalDetailsUpdatedHandler,
    ProfileCreatedHandler,
    ProfileDetailsUpdatedHandler
} from './events';
import { ProfilesSagas } from './profiles.sagas';
import { ProfilesService } from './profiles.service';
import { UpdateDetailsHandler } from './commands/update-details.handler';
import { ProfileMatchesUpdatedEventhandler } from './events/profile-match-updated.handler';
export const CommandHandlers = [
  CreateProfileHandler,
  UpdateContactDetailsHandler,
  UpdatePersonalDetailsHandler,
  UpdateDetailsHandler,
];
export const EventHandlers = [
  ProfileCreatedHandler,
  ContactDetailsUpdatedHandler,
  AddressDetailsUpdatedHandler,
  PersonalDetailsUpdatedHandler,
  OccupationDetailsUpdatedHandler,
  AccountDetailsUpdatedHandler,
  ProfileDetailsUpdatedHandler,
  UpdateDetailsHandler,
  ProfileMatchesUpdatedEventhandler
];

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [
    ProfilesService,
    ...CommandHandlers,
    ...EventHandlers,
    ProfilesSagas,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
