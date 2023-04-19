
 import { CommandHandler, ICommandHandler,EventPublisher } from '@nestjs/cqrs';
import { IUpdateMatchResponse, updateMatchCommand } from '@mp/api/feed/util';
import { Profile } from '@mp/api/profiles/feature/models';
import { ProfilesRepository } from '@mp/api/profiles/data-access';

@CommandHandler(updateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<updateMatchCommand> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: ProfilesRepository,
    ) {}

  async execute(command: updateMatchCommand) {
    console.log(`${UpdateMatchHandler.name}`);

    const request = command.request;
    const UID = request.profile.UID;
    // const displayName = request.user.displayName;
    // const email = request.user.email;
    // // const photoURL = request.user.photoURL;
    // const cellphone = request.user.phoneNumber;


    const profileDoc = await this.repository.findOne(request.profile)
    if(profileDoc){
      const profileData = profileDoc.data();

      if (!profileData) throw ("Profile not found")
  
      const profile = this.publisher.mergeObjectContext(
        Profile.fromData(profileData)
      );
  
      
      profile.updateMatch(request.profile);
      profile.commit();
  
      const response: IUpdateMatchResponse = { profile };
      return response;

    }

  }
}
