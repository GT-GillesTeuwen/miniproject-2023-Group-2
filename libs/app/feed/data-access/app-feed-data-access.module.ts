import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appFeedDataAccessRoutes } from './src/lib/lib.routes';
import {FeedApi} from "./src/feed.api";
@NgModule({
  imports: [CommonModule, RouterModule.forChild(appFeedDataAccessRoutes)],
  providers: [FeedApi]
})
export class AppFeedDataAccessModule {}
