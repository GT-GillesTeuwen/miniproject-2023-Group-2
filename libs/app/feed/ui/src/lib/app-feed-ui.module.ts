import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appFeedUiRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appFeedUiRoutes)],
})
export class AppFeedUiModule {}
