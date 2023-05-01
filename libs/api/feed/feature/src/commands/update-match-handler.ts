
 import { CommandHandler, ICommandHandler,EventPublisher } from '@nestjs/cqrs';
import { IUpdateMatchResponse, updateMatchCommand } from '@mp/api/feed/util';
import { Profile } from '@mp/api/profiles/feature';
import { ProfilesRepository } from '@mp/api/profiles/data-access';

@CommandHandler(updateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<updateMatchCommand, IUpdateMatchResponse> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: ProfilesRepository,
    ) {}

  async execute(command: updateMatchCommand) {
    console.log(`${UpdateMatchHandler.name}`);

    console.log("I am in match handler");

    const request = command.request;   // prof with one new match
    let num : number;
    console.log("request : ");
    console.log(request);
    console.log(request.profile.Matches);
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
          profileData.Matches = matches;
          // console.log(request.profile.Matches);
          profile.updateDetails(profileData);
          profile.commit();

          const response: IUpdateMatchResponse = { profile };
          return response;
        }
      }
      
    //Normal  so type = SEND
      console.log("SEND : " + request.profile);
      console.log(request.profile);
    
        // await this.repository.updateMatches(request.profile);
        profile.updateMatch(request.profile,request.type);
        profile.commit();
    
        const response: IUpdateMatchResponse = { profile };
        return response;
      
      
      

  


    }
    else
    {

    let jan : IUpdateMatchResponse;
    return jan!;
  }


  }
}
