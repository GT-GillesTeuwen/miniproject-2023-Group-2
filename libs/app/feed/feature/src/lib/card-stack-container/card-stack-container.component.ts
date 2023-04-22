import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import { Select, Store } from '@ngxs/store';
import { IProfile } from '@mp/api/profiles/util';
import {IUser} from "@mp/api/users/util";
import { ProfileState } from '@mp/app/profile/data-access';
//import {CardItemComponent} from "../card-item/card-item.component";
import { SubscribeToProfile, UpdateTime } from '@mp/app/profile/util'
import { IAgeRange } from 'libs/api/profiles/util/src/interfaces/age-range.interface';
import { updateMatches } from '@mp/app/feed/util';

@Component({
  selector: 'mp-card-stack-container',
  templateUrl: './card-stack-container.component.html',
  styleUrls: ['./card-stack-container.component.scss'],
})
export class CardStackContainerComponent {


  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @ViewChild('currentTime') currentTime?: ElementRef;

  
  profilesToShow: IProfile[]=[];
  currentUserID!:string|null|undefined;
  currentUserAge!:string|null|undefined;
  currentUserAgeRange!:IAgeRange|null|undefined;

  constructor(
    private readonly store: Store
  ) {
    this.setCurrentUserDetails();
    this.populateProfilesToShow();};
    
  ngOnInit() {
    const isFirstTime = localStorage.getItem('firstTime') === null;
    if (isFirstTime) {
      alert("only once you say!??");
      this.currentIndex = 0;
      localStorage.setItem('firstTime', 'false');
    }
  }

 
  userList$ = new Observable<IUser>;  //Convert to state selector next
  prevChoice = true;
  counter = 0;

  currentIndex = 0; //currentIndexCounterForProfilesToShow 

  matchUsers(match: boolean){
    if(match == this.prevChoice){
      this.counter++;
    }
    else{
      this.prevChoice = match;
      this.counter = 0;
    }
    if(this.counter > 2){
      this.store.dispatch(new UpdateTime(this.currentTime?.nativeElement.innerText-5));
    }
    else{
      this.store.dispatch(new UpdateTime(this.currentTime?.nativeElement.innerText-1));
    }

    let tempArray = this.profilesToShow.slice().reverse();
    console.log('Users Matched!:'+match)
    //CHECK IF USER SWIPED LEFT OR RIGHT AND CALL FUNCTIONS ACCORDINGLY
    if(match){
      console.log(this.profilesToShow);
      console.log(tempArray);
      alert("this is their ID: " + tempArray[this.currentIndex].UID + "\nthis is my id: " + this.currentUserID + "\nthis is the currentIndex: "  + this.currentIndex);
      let didTheyLikeMe = false;
      tempArray[this.currentIndex].Matches?.forEach((match) => {
        if(match.MatchUserID == this.currentUserID){
          didTheyLikeMe = true;
        }
      });

      if(!didTheyLikeMe){
        if(this.currentUserID != null && this.currentUserID != undefined){
          this.store.dispatch(new updateMatches(this.currentUserID, tempArray[this.currentIndex]!.UID!, "SEND"));
        }
      }else{
        if(this.currentUserID != null && this.currentUserID != undefined){
          this.store.dispatch(new updateMatches(this.currentUserID, tempArray[this.currentIndex]!.UID!, "PAIR"));
        }
      }
      this.currentIndex++;
    }else{
      let didTheyLikeMe = false;
      tempArray[this.currentIndex].Matches?.forEach((match) => {
        if(match.MatchUserID == this.currentUserID){
          didTheyLikeMe = true;
        }
      });

      if(didTheyLikeMe){
        if(this.currentUserID != null && this.currentUserID != undefined){
          this.store.dispatch(new updateMatches(this.currentUserID, tempArray[this.currentIndex]!.UID!, "REMOVE"));
        }
      }
      this.currentIndex++;
    }
  }

  setCurrentUserDetails(){
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        this.currentUserID=profile.UID;
        this.currentUserAge=profile.Age;
        this.currentUserAgeRange=profile.Settings?.AgeRange;
      }else{
        alert("Profile undefined subscribing again");
        this.store.dispatch(new SubscribeToProfile());
      }
    });
  }

  populateProfilesToShow(){
    this.store.select(ProfileState.allProfiles).subscribe((profiles) => {
      this.profilesToShow=[];
      if(profiles!=undefined){
        for (let index = 0; index < profiles.length; index++) {
          if(this.getMatchStatus(profiles[index],this.currentUserID)=="RECEIVED"){
            this.profilesToShow.push(profiles[index]);
          }
        }
        for (let index = 0; index < profiles.length; index++) {
          const matchStatus=this.getMatchStatus(profiles[index],this.currentUserID);
          if(
            profiles[index].Name?.Firstname!=null&&
            matchStatus!="RECEIVED"&&
          matchStatus!="PAIRED"&&
          matchStatus!="PENDING"&&
          this.isInRange(this.currentUserAge,profiles[index].Settings?.AgeRange)&&
          this.isInRange(profiles[index].Age,this.currentUserAgeRange)&&
          profiles[index].Settings?.Privacy!="Private"&&
          profiles[index].UID!=this.currentUserID){
            this.profilesToShow.push(profiles[index]);
          }
        }
      }else{
        alert("Array undefined subscribing again");
        this.store.dispatch(new SubscribeToProfile());
      }
      
    });
    console.log(this.profilesToShow);
  }

  isInRange(age:string|null|undefined,ageRange:IAgeRange|null|undefined){
    if(age==undefined){
      return true;
    }
    if(ageRange==undefined){
      return true;
    }
    const ageNum=Number(age);
    const minAgeNum=Number(ageRange.MinAge);
    const maxAgeNum=Number(ageRange.MaxAge);
    return (ageNum>=minAgeNum && ageNum<=maxAgeNum);
  }

  getMatchStatus(profile:IProfile,UID:string|null|undefined){
    if(profile.Matches==undefined){
      return "null";
    }
    for (let index = 0; index < profile?.Matches.length; index++) {
      if(profile.Matches[index].MatchUserID==UID){
        return profile.Matches[index].MatchStatus;
      }
    }
    return "null";
  }
}
