import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateAccountDetails, UpdateOtherProfileTime, UpdateTime } from '@mp/app/profile/util';
import { SendMessage, UpdateMeetingDetails } from '@mp/app/chat/util';
import { IMeetingDetails, IMessage } from '@mp/api/chat/util';

@Component({
  selector: 'mp-verified-page',
  templateUrl: './verified-page.component.html',
  styleUrls: ['./verified-page.component.scss'],
})
export class VerifiedPageComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(ProfileState.allProfiles) allProfiles$!: Observable<IProfile[] | null>;

  public isSearchBarOpened = false;

  constructor(private readonly store: Store, private navCtrl: NavController, private router:Router, private route:ActivatedRoute) {}

  goHome(){
    this.navCtrl.navigateForward('home/feed');
  }

  otherPersonName!: string;
  meetingTimeInvested!: number;
  pairId!: string;
  currentUserId!: string;
  otherUserId!: string;
  myCurrentTime!: number;
  theirCurrentTime!: number;

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
        const state = this.router.getCurrentNavigation()!.extras.state;
        if (state) {
          this.otherPersonName = state['otherPersonName'];
          this.meetingTimeInvested = state['timeInvested'];
          this.pairId = state['pairId'];
          // this.store.dispatch(new SubscribeToConversation(this.pairId));
        }
    });

    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        this.currentUserId=profile.UID!;
        this.myCurrentTime = profile.TimeRemaining!;
      }else{
      }
    });

    if(this.currentUserId != null && this.currentUserId != undefined)
      this.otherUserId = this.pairId.replace(this.currentUserId, '').substring(0, this.currentUserId.length);

    this.store.select(ProfileState.allProfiles).subscribe((profiles) => {
      if(profiles!=undefined){
        for (let index = 0; index < profiles.length; index++) {
          if(profiles[index].UID == this.otherUserId){
            this.theirCurrentTime = profiles[index].TimeRemaining!;
          }
        }
      }
    });

    alert(this.currentUserId + " " + this.myCurrentTime + " " + this.otherUserId + " " + this.theirCurrentTime);

    let myTimeToUpdate = this.myCurrentTime + this.meetingTimeInvested * 2;
    let theirTimeToUpdate = this.theirCurrentTime + this.meetingTimeInvested * 2;

    this.store.dispatch(new UpdateTime(myTimeToUpdate));
    this.store.dispatch(new UpdateOtherProfileTime(theirTimeToUpdate, this.otherUserId));


    const message: IMessage ={
      ToUserID:"u1",
      FromUserID:this.currentUserId,
      Content:"System Message - Your meeting has been verified!"
    }

    const message2: IMessage ={
      ToUserID:"u1",
      FromUserID:this.otherUserId,
      Content:"System Message - Your meeting has been verified!"
    }
    
    const meetingDetails: IMeetingDetails ={
      Date: null,
      Time: null,
      Location: null,
      FoodPreference: null,
      DressCode: null,
      TimeInvested:0 //Replace with time invested
    }

    console.log("meetings: ", meetingDetails);
    
    this.store.dispatch(new UpdateMeetingDetails(this.pairId,meetingDetails));
    // this.store.dispatch(new SendMessage(this.pairId,message2,0));
    this.store.dispatch(new SendMessage(this.pairId,message,0));
  }
}
