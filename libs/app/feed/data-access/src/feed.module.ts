import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FeedState } from './feed.state';
import { FeedApi } from './feed.api';
import { AuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([FeedState]),AuthModule],
  providers: [FeedApi],
})
export class FeedModule {}
