import { Component } from '@angular/core';
import { IMatchDetails, IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { ChatState } from '@mp/app/chat/data-access';
import { CreateConversation, SubscribeToConversation } from '@mp/app/chat/util';

interface LastMessage {
  message: string;
  pairId: string;
}

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

  allMessages:string[] = [];

  allLastMessages: LastMessage[] = [];

  getPairId(theirMatches: IMatchDetails[]){
    this.setCurrentUserID();
    for(let i=0; i<theirMatches.length; i++){
      if(theirMatches[i].MatchUserID == this.currentUserID){

        console.log("Pair id: " + theirMatches[i].PairID);
        this.pairId = theirMatches[i].PairID!;
      }
    }

    this.getLastMessage();
    return this.pairId;
  }



  getLastMessage(){
    // this.store.dispatch(new SubscribeToConversation(this.pairId));

        this.store.select(ChatState.conversation).subscribe((chatHistory) => {
          if(chatHistory && chatHistory.Messages && chatHistory.Messages.length > 0){
            const tempMessageArray = chatHistory?.Messages?.[chatHistory.Messages.length-1];

            if(tempMessageArray.Content){
              this.lastMessage = tempMessageArray.Content;
              this.allLastMessages.push({message: this.lastMessage, pairId: this.pairId});
              this.allMessages.push(this.lastMessage);
            }
          }else{
            // this.store.dispatch(new CreateConversation());
          }
        });
    console.log("all messages: ", this.allLastMessages);
    return this.lastMessage;
  }
}
