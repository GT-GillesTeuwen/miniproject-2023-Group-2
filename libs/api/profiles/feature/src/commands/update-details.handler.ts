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
    console.log(request.profile.UID);
    console.log("logged UID");
    const profileDoc = await this.repository.findOne(request.profile)

    if(!profileDoc) throw ("Profile not found 53")
    console.log(profileDoc.data())
    const profileData = profileDoc.data(); 

    if (!profileData) throw ("Profile not found 54")

    const profile = this.publisher.mergeObjectContext(
      Profile.fromData(profileData)
    );

    
    profile.updateDetails(request.profile);
    profile.commit();

    const response: IUpdateProfileResponse = { profile };
    return response;
  }
}
