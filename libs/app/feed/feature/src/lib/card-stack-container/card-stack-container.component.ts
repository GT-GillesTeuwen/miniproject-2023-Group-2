import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import { Select, Store } from '@ngxs/store';
import { IProfile } from '@mp/api/profiles/util';
import {IUser} from "@mp/api/users/util";
import { ProfileState } from '@mp/app/profile/data-access';
//import {CardItemComponent} from "../card-item/card-item.component";
import { UpdateTime } from '@mp/app/profile/util'

@Component({
  selector: 'mp-card-stack-container',
  templateUrl: './card-stack-container.component.html',
  styleUrls: ['./card-stack-container.component.scss'],
})
export class CardStackContainerComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @ViewChild('currentTime') currentTime?: ElementRef;


  constructor(
    private readonly store: Store
  ) {};
 
  userList$ = new Observable<IUser>;  //Convert to state selector next
  prevChoice = true;
  counter = 0;

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
    console.log('Users Matched!:'+!match)
  }
}
