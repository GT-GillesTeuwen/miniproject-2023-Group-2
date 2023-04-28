import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appFeedDataAccessRoutes } from './src/lib/lib.routes';
import {FeedApi} from "./src/feed.api";
import { FeedModule } from './src/feed.module';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(appFeedDataAccessRoutes),FeedModule],
  providers: [FeedApi]
})
export class AppFeedDataAccessModule {}
