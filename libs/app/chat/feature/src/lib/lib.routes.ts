import { Route } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';

export const appChatFeatureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: ChatPageComponent,
  },
  // {
  //   path: 'messages',
  //   pathMatch: 'full',
  //   component: MessagesPageComponent
  // }
];
