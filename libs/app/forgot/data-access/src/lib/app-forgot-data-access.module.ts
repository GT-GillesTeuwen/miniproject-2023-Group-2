import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appForgotDataAccessRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appForgotDataAccessRoutes)],
})
export class AppForgotDataAccessModule {}
