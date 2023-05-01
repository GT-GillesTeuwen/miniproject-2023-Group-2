import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

import {MessagesPageComponent} from '@mp/app/chat/feature'
import { VerifyPageComponent } from '@mp/app/chat/feature';
import { VerifiedPageComponent } from '@mp/app/chat/feature';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('@mp/app/feed/feature').then((m) => m.AppFeedFeatureModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@mp/app/profile/feature').then((m) => m.ProfileModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@mp/app/settings/feature').then((m) => m.AppSettingsFeatureModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('@mp/app/chat/feature').then((m) => m.AppChatFeatureModule),
      },
      {
        path: 'tos',
        loadChildren: () =>
          import('@mp/app/tos/feature').then((m) => m.TosModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/feed',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/feed',
  },
  {
    path: 'chat/messages',
    pathMatch: 'full',
    component: MessagesPageComponent
  },
  {
    path: 'chat/verify',
    pathMatch: 'full',
    component: VerifyPageComponent
  },
  {
    path: 'chat/verified',
    pathMatch: 'full',
    component: VerifiedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
