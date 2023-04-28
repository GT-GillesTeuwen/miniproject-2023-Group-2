import { Component, OnInit } from '@angular/core';
import { IMatchDetails, IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { ChatState } from '@mp/app/chat/data-access';
import { CreateConversation, SubscribeToConversation, SubscribeToConversations } from '@mp/app/chat/util';


interface LastMessage {
  message: string;
  pairId: string;
}

@Component({
  selector: 'mp-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss'],
})

export class MatchesPageComponent implements OnInit{
  @Select(ProfileState.allProfiles) matches$!: Observable<IProfile[] | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(ChatState.allConversations) conversations$!: Observable<IProfile[] | null>;

  constructor(private readonly store: Store) { this.store.dispatch(new SubscribeToConversations()); }

  currentUserID!: string | null | undefined;
  lastMessage = "Start a conversation!";
  pairId!: string;

  ngOnInit() {
    this.store.dispatch(new SubscribeToConversations()); 
  }

  setCurrentUserID() {
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if (profile != undefined) {
        this.currentUserID = profile.UID;
      } else {
        alert("Profile undefined subscribing again");
        this.store.dispatch(new SubscribeToProfile());
      }
    });

  }
  once = true;

  getLastMessage2(pairID: string) {
    if (this.once) {
      this.store.dispatch(new SubscribeToConversations());
      this.once = false;
    }
    let ret="nada";
     this.store.select(ChatState.allConversations).subscribe((all) => {

      for (let index = 0; index < all!.length; index++) {
        if (all==undefined || !all![index]) {
          ret= "no convo";
          return;
        }
        if (all && all[index] && all[index].Messages) {
          if (all[index].Messages?.length == 0) {
            ret= "Start a conversation!!";
          }
          if (all[index].PairID == pairID) {
            if (!all[index].Messages![all![index].Messages?.length! - 1]) {
              ret= "Start a conversation!";
              return;
            } else {
              ret= all![index].Messages![all![index].Messages?.length! - 1].Content!;
              return;
            }

          }
        }
      }
      return "nothing"
    });

    return ret
  }

  allMessages: string[] = [];

  allLastMessages: LastMessage[] = [];

  getPairId(theirMatches: IMatchDetails[]) {
    this.setCurrentUserID();
    for (let i = 0; i < theirMatches.length; i++) {
      if (theirMatches[i].MatchUserID == this.currentUserID) {

        console.log("Pair id: " + theirMatches[i].PairID);
        this.pairId = theirMatches[i].PairID!;
      }
    }

    this.getLastMessage();
    return this.pairId;
  }



  getLastMessage() {
    // this.store.dispatch(new SubscribeToConversation(this.pairId));

    this.store.select(ChatState.conversation).subscribe((chatHistory) => {
      if (chatHistory && chatHistory.Messages && chatHistory.Messages.length > 0) {
        const tempMessageArray = chatHistory?.Messages?.[chatHistory.Messages.length - 1];

        if (tempMessageArray.Content) {
          this.lastMessage = tempMessageArray.Content;
          this.allLastMessages.push({ message: this.lastMessage, pairId: this.pairId });
          this.allMessages.push(this.lastMessage);
        }
      } else {
        // this.store.dispatch(new CreateConversation());
      }
    });
    console.log("all messages: ", this.allLastMessages);
    return this.lastMessage;
  }


  //check if I have any matches at all
  doIHaveMatches(){
    let returning = false;
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if (profile != undefined) {
        for(let i=0; i<profile.Matches?.length!; i++){
          if(profile.Matches?.[i].MatchStatus == "PAIRED"){
            returning = true;
          }
        }
      }
    });
    return returning;
  }
}
