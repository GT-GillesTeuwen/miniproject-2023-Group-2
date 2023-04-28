import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appForgotUtilRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appForgotUtilRoutes)],
})
export class AppForgotUtilModule {}
