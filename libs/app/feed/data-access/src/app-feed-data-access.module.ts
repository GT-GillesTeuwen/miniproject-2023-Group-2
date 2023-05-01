import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appFeedDataAccessRoutes } from './lib/lib.routes';
import {FeedApi} from "./feed.api";
import { FeedModule } from './feed.module';
@NgModule({
  imports: [CommonModule, RouterModule.forChild(appFeedDataAccessRoutes),FeedModule],
  providers: [FeedApi]
})
export class AppFeedDataAccessModule {}
