import { Component } from '@angular/core';
import { IMatchDetails, IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { ChatState } from '@mp/app/chat/data-access';
import { CreateConversation } from '@mp/app/chat/util';

@Component({
  selector: 'mp-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss'],
})
export class MatchesPageComponent {
  @Select(ProfileState.allProfiles) matches$!: Observable<IProfile[] | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  constructor(private readonly store: Store){}

  currentUserID!:string|null|undefined;
  lastMessage = "Start a conversation!";
  pairId!: string;

  setCurrentUserID(){
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        this.currentUserID=profile.UID;
      }else{
        alert("Profile undefined subscribing again");
        this.store.dispatch(new SubscribeToProfile());
      }
    });
  }

  getLastMessage(theirMatches: IMatchDetails[]){
    this.setCurrentUserID();
    for(let i=0; i<theirMatches.length; i++){
      if(theirMatches[i].MatchUserID == this.currentUserID){

        console.log("Pair id: " + theirMatches[i].PairID);
        this.pairId = theirMatches[i].PairID!;

        this.store.select(ChatState.conversation).subscribe((chatHistory) => {
          if(chatHistory && chatHistory.Messages && chatHistory.Messages.length > 0){
            const tempMessageArray = chatHistory?.Messages?.[chatHistory.Messages.length-1];

            if(tempMessageArray.Content){
              this.lastMessage = tempMessageArray.Content;
            }
          }else{
            // this.store.dispatch(new CreateConversation());
          }
        });
      }
    }
    return this.lastMessage;
  }
}
