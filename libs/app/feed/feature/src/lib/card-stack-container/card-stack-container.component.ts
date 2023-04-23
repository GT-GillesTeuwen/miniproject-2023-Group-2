import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "@mp/api/users/util";
import {CardItemComponent} from "../card-item/card-item.component";
import {IProfile} from "@mp/api/profiles/util";

@Component({
  selector: 'mp-card-stack-container',
  templateUrl: './card-stack-container.component.html',
  styleUrls: ['./card-stack-container.component.scss'],
})
export class CardStackContainerComponent {

  @Input() userList: IProfile[] | undefined;  //Convert to state selector next

  matchUsers(match: boolean){
    console.log('Users Matched!:'+!match)
  }
}
