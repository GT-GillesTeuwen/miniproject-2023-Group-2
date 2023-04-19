import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { SubscribeToConversation } from '@mp/app/chat/util';

@Component({
  selector: 'mp-profile-card-page',
  templateUrl: './profile-card-page.component.html',
  styleUrls: ['./profile-card-page.component.scss'],
})
export class ProfileCardPageComponent {

  constructor(private navCtrl: NavController, private readonly store: Store) {}

  @Input() personName!: string;
  @Input() lastMessage!: string;
  @Input() unreadMessages!: string;
  @Input() imgSrc!: string;

  openMessagesPage() {
    alert("persons name: " + this.personName + "\nlast message: " + this.lastMessage + "\nunreadMessages: " + this.unreadMessages + "\nimg-src: " + this.imgSrc);
    this.store.dispatch(new SubscribeToConversation);
    this.navCtrl.navigateForward('home/chat/messages');
  }
}
