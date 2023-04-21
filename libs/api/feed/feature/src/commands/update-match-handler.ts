
 import { CommandHandler, ICommandHandler,EventPublisher } from '@nestjs/cqrs';
import { IUpdateMatchResponse, updateMatchCommand } from '@mp/api/feed/util';
import { Profile } from '@mp/api/profiles/feature/models';
import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { IMatchDetails } from '@mp/api/profiles/util';

@CommandHandler(updateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<updateMatchCommand> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: ProfilesRepository,
    ) {}

  async execute(command: updateMatchCommand) {
    console.log(`${UpdateMatchHandler.name}`);

    const request = command.request;   // prof with one new match
    let num : number;

    const profileDoc = await this.repository.findOne(request.profile);
    if(profileDoc){
      const profileData = profileDoc.data();  //current value
      if (!profileData) throw ("Profile not found");
      
      const profile = this.publisher.mergeObjectContext(
        Profile.fromData(profileData)
      );

      if(profileData  && profileData.Matches && request.profile.Matches)  // if type = SEND then matches might be null
      {
        const match = request.profile.Matches[0];

        if(request.type=="PAIR"){

          for (let i = 0; i < profileData?.Matches.length; i++) {
            if(profileData.Matches[i].MatchUserID==request.profile.Matches[0].MatchUserID){
              num = i;
              profileData.Matches[num] = match;
              break;
            }
          }

          profile.fromData(profileData);
          profile.updateDetails(profileData);
          profile.commit();

          const response: IUpdateMatchResponse = { profile };
          return response;
        }
        else
        if(request.type=="REMOVE"){
          const matches = [];

          for (let i = 0; i < profileData?.Matches.length; i++) {
            if(profileData.Matches[i].MatchUserID!=request.profile.Matches[0].MatchUserID){
              matches.push(profileData.Matches[i]);
            }
          }
          profile.fromData(profileData);
          profile.updateDetails(profileData);
          profile.commit();

          const response: IUpdateMatchResponse = { profile };
          return response;
        }
      }
      
      {   //Normal  so type = SEND

    
        
        profile.updateMatch(request.profile,request.type);
        profile.commit();
    
        const response: IUpdateMatchResponse = { profile };
        return response;
      }
      
      

  


    }

  }
}
