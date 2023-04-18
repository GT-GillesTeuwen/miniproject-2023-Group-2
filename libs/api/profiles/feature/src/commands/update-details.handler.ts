import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {
    IUpdateProfileResponse,
    UpdateDetailsCommand
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';

@CommandHandler(UpdateDetailsCommand)
export class UpdateDetailsHandler
  implements
    ICommandHandler<UpdateDetailsCommand, IUpdateProfileResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ProfilesRepository
  ) {}

  async execute(command: UpdateDetailsCommand) {
    console.log(`${UpdateDetailsHandler.name}`);

    const request = command.request;
    console.log(request.profile.Name?.Firstname);1
    const profileDoc = await this.repository.findOne(request.profile);
    const profileData = profileDoc.data();

    if (!profileData) throw ("Profile not found")

    const profile = this.publisher.mergeObjectContext(
      Profile.fromData(profileData)
    );

    
    profile.updateDetails(request.profile);
    profile.commit();

    const response: IUpdateProfileResponse = { profile };
    return response;
  }
}
