import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { appChatFeatureRoutes } from './lib.routes';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { FormsModule } from '@angular/forms';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { ProfileCardPageComponent } from './profile-card-page/profile-card-page.component';
import { MatchesPageComponent } from './matches-page/matches-page.component';
import { SentBubbleUiComponent } from './sent-bubble-ui/sent-bubble-ui.component';
import { ReceivedBubbleUiComponent } from './received-bubble-ui/received-bubble-ui.component';
import { ReceivedEmojiUiComponent } from './received-emoji-ui/received-emoji-ui.component';
import { SentEmojiUiComponent } from './sent-emoji-ui/sent-emoji-ui.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';

// import { ChatModule } from '@mp/app/chat/data-access';

import { VerifiedPageComponent } from './verified-page/verified-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChatFeatureRoutes),
    IonicModule,
    FormsModule,
    // ChatModule,
  ],
  declarations: [
    ChatPageComponent,
    MessagesPageComponent,
    FriendsPageComponent,
    ProfileCardPageComponent,
    MatchesPageComponent,
    SentBubbleUiComponent,
    ReceivedBubbleUiComponent,
    ReceivedEmojiUiComponent,
    SentEmojiUiComponent,
    VerifyPageComponent,
    VerifiedPageComponent,
  ],
})
export class AppChatFeatureModule {}
