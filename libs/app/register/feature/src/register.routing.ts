import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './register.page';

import { VerifyPageComponent } from 'libs/app/chat/feature/src/lib/verify-page/verify-page.component';
import { MessagesPageComponent } from 'libs/app/chat/feature/src/lib/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
  },
  {
    path: 'register/complete',
    pathMatch : 'full',
    component: RegisterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRouting {}
