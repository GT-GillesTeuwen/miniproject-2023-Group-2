import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { SubscribeToConversation, SubscribeToConversations } from '@mp/app/chat/util';
import { NavigationExtras } from '@angular/router';
import { ChatState } from '@mp/app/chat/data-access';
import { Observable } from 'rxjs';
import { IConversation } from '@mp/api/chat/util';

@Component({
  selector: 'mp-profile-card-page',
  templateUrl: './profile-card-page.component.html',
  styleUrls: ['./profile-card-page.component.scss'],
})
export class ProfileCardPageComponent {

  @Select(ChatState.allConversations) allConvos$!: Observable<IConversation[] | null>

  constructor(private navCtrl: NavController, private readonly store: Store) {}

  ngOnInit(){
    this.store.dispatch(new SubscribeToConversations);
  }

  @Input() personName!: string;
  @Input() unreadMessages!: string;
  @Input() imgSrc!: string;
  @Input() pairId!: string;

  openMessagesPage() {
    alert("persons name: " + this.personName + "\nlast message: " + "\nunreadMessages: " + this.unreadMessages + "\nimg-src: " + this.imgSrc);
    // this.store.dispatch(new SubscribeToConversation);
    this.navCtrl.navigateForward('home/chat/messages', {
      state: {
        personName: this.personName,
        unreadMessages: this.unreadMessages,
        imgSrc: this.imgSrc,
        pairId: this.pairId
      }
    });
  }
}
