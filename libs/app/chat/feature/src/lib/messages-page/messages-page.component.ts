import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProfileState } from '@mp/app/profile/data-access';
import { ChatState } from '@mp/app/chat/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { CreateConversation, SendMessage,UpdateMeetingDetails } from '@mp/app/chat/util';

import { NavController } from '@ionic/angular';
import { SentBubbleUiComponent } from '../sent-bubble-ui/sent-bubble-ui.component';
import { Time } from '@angular/common';
import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';

@Component({
  selector: 'mp-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent {
  @Select(ChatState.conversation) chat$!: Observable<IConversation | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  public isSearchBarOpened = false;

  @ViewChild(IonModal) modal!: IonModal;


    //ROUTING TO VERIFICATION PAGE
    constructor(private navCtrl: NavController, private readonly store: Store) {const conversation: IConversation ={
      ConversationID:"1",
      User1ID:"u1",
      User2ID:"u2",
      Messages:[],
      MeetingDetails:{
        Date: null,
        Time: null,
        Location:null,
        FoodPreference: null,
        DressCode: null,
        TimeInvested:0,
      }
    }
    //this.store.dispatch(new )
    this.store.dispatch(new CreateConversation(conversation));
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  dateSelected!: string;
  timeSelected!: string;
  locationSelected!: string;
  foodSelected = "none";
  dressSelected = "none";

  datePass = false;
  timePass = false;
  locationPass = false;
  showErrors = false;
  showVerifyError = false;

  verifyPass = false;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if(this.timeSelected != undefined){
      if(this.timeSelected.length != 0){
        this.timePass = true;
      }else{
        this.timePass = false;
        this.showErrors = true;
      }
    }else{
      this.timePass = false;
      this.showErrors = true;
    }

    if(this.dateSelected != undefined){
      if(this.dateSelected.length != 0){
        this.datePass = true;
      }else{
        this.datePass = false;
        this.showErrors = true;
      }
    }else{
      this.datePass = false;
      this.showErrors = true;
    }

    if(this.locationSelected != undefined){
      if(this.locationSelected.length != 0){
        this.locationPass = true;
      }else{
        this.locationPass = false;
        this.showErrors = true;
      }
    }else{
      this.locationPass = false;
      this.showErrors = true;
    }

    if(this.datePass && this.timePass && this.locationPass){
      this.verifyPass = true;
      this.showVerifyError = false;
      alert("date selected: " + this.dateSelected + "\ntime selected: " + this.timeSelected + "\nlocation selected: " + this.locationSelected + "\nfood selected: " + this.foodSelected + "\ndress selected: " + this.dressSelected );
      this.modal.dismiss(this.locationSelected, 'confirm');
      const meetingDetails: IMeetingDetails ={
        Date:this.dateSelected,
        Time:this.timeSelected,
        Location:this.locationSelected,
        FoodPreference:this.foodSelected,
        DressCode:this.dressSelected,
        TimeInvested:0 //Replace with time invested
      }
      this.store.dispatch(new UpdateMeetingDetails("1",meetingDetails));
      
    }else{
      this.verifyPass = false;
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  //FOR SENDING MESSAGES:
  messageToSend!: string;

  sendMessage(){
    alert("Message to send is: " + this.messageToSend);
    const message: IMessage ={
      ToUserID:"u1",
      FromUserID:"u2",
      Content:this.messageToSend
    }
    //this.store.dispatch(new )
    this.store.dispatch(new SendMessage("1",message));
    alert("dispatch done");
  }



  openVerifyPage() {
    if(this.verifyPass == true){
      this.navCtrl.navigateForward('home/chat/verified');
      this.cancel();
    }else{
      this.showVerifyError = true;
    }
  }
}
