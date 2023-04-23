import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleRegisterPage } from './googleregister.page';

import { VerifyPageComponent } from 'libs/app/chat/feature/src/lib/verify-page/verify-page.component';
import { MessagesPageComponent } from 'libs/app/chat/feature/src/lib/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: GoogleRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleRegisterRouting {}
