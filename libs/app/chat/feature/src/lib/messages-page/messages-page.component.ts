import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonModal, IonInput } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProfileState } from '@mp/app/profile/data-access';
import { ChatState } from '@mp/app/chat/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateConversation, SendMessage,SubscribeToConversation,UpdateMeetingDetails } from '@mp/app/chat/util';

import { NavController } from '@ionic/angular';
import { SentBubbleUiComponent } from '../sent-bubble-ui/sent-bubble-ui.component';
import { Time } from '@angular/common';
import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';
import { UpdateTime } from '@mp/app/profile/util';

@Component({
  selector: 'mp-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit{
  @Select(ChatState.conversation) chat$!: Observable<IConversation | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  public isSearchBarOpened = false;

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('messageSendInput') messageSendInput!: IonInput;

  currentUserID!:string|null|undefined;
  currentPairIDVar!:string|null|undefined;

    //ROUTING TO VERIFICATION PAGE

    constructor(private navCtrl: NavController, private readonly store: Store,private route:ActivatedRoute,private router:Router) {
      const conversation: IConversation ={
        PairID:"1",
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
    this.setCurrentUserDetails();
    this.setCurrentConvoDetails();

    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        this.currentTimeRem=profile.TimeRemaining!;
      }else{
        alert("Array undefined subscribing again");
      }
    });
    this.store.select(ChatState.timeInvested).subscribe((time) => {
      if(time!=undefined){
        this.meetingTimeInvested=time!;
      }else{
        alert("Array undefined subscribing again");
      }
    });
    //this.store.dispatch(new )
    // this.store.dispatch(new CreateConversation(conversation));
  }

  setCurrentUserDetails(){
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        this.currentUserID=profile.UID;
      }else{
      }
    });
  }

  setCurrentConvoDetails(){
    this.store.select(ChatState.conversation).subscribe((conversation) => {
      if(conversation!=undefined){
        this.currentPairIDVar=conversation.PairID;
      }else{
      }
    });
  }

  //message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  dateSelected!: string;
  timeSelected!: string;
  locationSelected!: string;
  foodSelected!: string;
  dressSelected!: string;

  currentTimeRem!:number;
  meetingTimeInvested!:number;

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
      //alert("date selected: " + this.dateSelected + "\ntime selected: " + this.timeSelected + "\nlocation selected: " + this.locationSelected + "\nfood selected: " + this.foodSelected + "\ndress selected: " + this.dressSelected );
      this.modal.dismiss(this.locationSelected, 'confirm');
      const meetingDetails: IMeetingDetails ={
        Date:this.dateSelected,
        Time:this.timeSelected,
        Location:this.locationSelected,
        FoodPreference:this.foodSelected,
        DressCode:this.dressSelected,
        TimeInvested:0 //Replace with time invested
      }
      this.currentTimeRem-=30;
      this.store.dispatch(new SubscribeToConversation(this.pairId));
      this.store.dispatch(new UpdateMeetingDetails(this.getCurrentPairID(),meetingDetails));

      
    }else{
      this.verifyPass = false;
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  checkFormValues(){
    if(this.getCurrentDateSelected() != null){
      this.dateSelected = this.getCurrentDateSelected();
    }
    if(this.getCurrentTimeSelected() != null){
      this.timeSelected = this.getCurrentTimeSelected();
    }
    if(this.getCurrentLocationSelected() != null){
      this.locationSelected = this.getCurrentLocationSelected();
    }
    if(this.getCurrentFoodSelected() != null){
      this.foodSelected = this.getCurrentFoodSelected();
    }else{
      this.foodSelected = "none";
    }
    if(this.getCurrentDressSelected() != null){
      this.dressSelected = this.getCurrentDressSelected();
    }else{
      this.dressSelected = "none";
    }
  }


  //FOR SENDING MESSAGES:
  messageToSend!: string;

  sendMessage(){
    
    var profileUID:string|undefined|null;
    this.store.select(ProfileState.profile).subscribe((profile) => {
      profileUID=profile?.UID;
      
    });
   
    const message: IMessage ={
      ToUserID:"u1",

      FromUserID:profileUID,
      Content:this.messageToSend
    }

    this.store.dispatch(new SubscribeToConversation(this.pairId));
    this.currentTimeRem-=1;
    this.meetingTimeInvested+=1;
    this.store.dispatch(new UpdateTime(this.currentTimeRem));
    this.store.dispatch(new SendMessage(this.pairId,message,this.meetingTimeInvested));
    this.messageSendInput.value = "";
  }

  checkEnterKey(event: KeyboardEvent){
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }



  openVerifyPage() {
    if(this.verifyPass == true){
      this.navCtrl.navigateForward('home/chat/verified');
      this.cancel();
    }else{
      this.showVerifyError = true;
    }
  }


  //GETTING CORRECT FORM DATA:
  @ViewChild('currentDateSelected') currentDateSelected?: ElementRef;
  @ViewChild('currentTimeSelected') currentTimeSelected?: ElementRef;
  @ViewChild('currentLocationSelected') currentLocationSelected?: ElementRef;
  @ViewChild('currentFoodSelected') currentFoodSelected?: ElementRef;
  @ViewChild('currentDressSelected') currentDressSelected?: ElementRef;
  @ViewChild('currentPairID') currentPairID?: ElementRef;
  @ViewChild('currentTime') currentTime?: ElementRef;

  getCurrentDateSelected() {
    return this.currentDateSelected?.nativeElement.innerText;
  }
  getCurrentTimeSelected() {
    return this.currentTimeSelected?.nativeElement.innerText;
  }
  getCurrentLocationSelected() {
    return this.currentLocationSelected?.nativeElement.innerText;
  }
  getCurrentFoodSelected() {
    return this.currentFoodSelected?.nativeElement.innerText;
  }
  getCurrentDressSelected() {
    return this.currentDressSelected?.nativeElement.innerText;
  }
  getCurrentPairID() {
    return this.currentPairID?.nativeElement.innerText;
  }


  //GETTING DATE
  getDateFromTimestamp(timestampSeconds: number | undefined): string {
    if (!timestampSeconds) {
      return '';
    }
  
    const date = new Date(timestampSeconds * 1000); // Convert to milliseconds
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  //on init, get values from matches-page.component.ts
  personName!: string;
  unreadMessages!: number;
  imgSrc!: string;
  pairId!: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const state = this.router.getCurrentNavigation()!.extras.state;
        if (state) {
          this.personName = state['personName'];
          this.unreadMessages = state['unreadMessages'];
          this.imgSrc = state['imgSrc'];
          this.pairId = state['pairId'];
          this.store.dispatch(new SubscribeToConversation(this.pairId));
        }
      })
  }
}
