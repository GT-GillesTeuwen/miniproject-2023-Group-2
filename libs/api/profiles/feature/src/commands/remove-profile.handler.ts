import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {
    IRemoveProfileResponse,
    RemoveProfileCommand
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';

@CommandHandler(RemoveProfileCommand)
export class RemoveProfileHandler
  implements
    ICommandHandler<RemoveProfileCommand, IRemoveProfileResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ProfilesRepository
  ) {}

  async execute(command: RemoveProfileCommand) {
    console.log(`${RemoveProfileHandler.name}`);

    const request = command.request;
    const profileDoc = await this.repository.findOne(request.profile);
    const profileData = profileDoc?.data();

    if (!profileData) throw new Error('Profile not found (Remove)');

    const profile = this.publisher.mergeObjectContext(
      Profile.fromData(profileData)
    );

    if (!request.profile)
      throw new Error('Profile not found');
    profile.removeProfile(request.profile);
    profile.commit();

    const response: IRemoveProfileResponse = {status:true};
    return response;
  }
}
